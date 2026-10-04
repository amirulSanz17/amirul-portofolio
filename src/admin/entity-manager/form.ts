import { formatDateRange, parseDateRange } from "../../utils/dateRange"

import type { AdminField, EntityFormData, EntityRow } from "../types"

export function createEntityForm(
  row: EntityRow | null,

  fields: AdminField[],
): EntityFormData {
  const form: EntityFormData = {}

  fields.forEach((field) => {
    const value = row?.[field.name]

    if (field.type === "date-range") {
      const range = parseDateRange(value == null ? "" : String(value))

      form[`${field.name}_start`] = range.startDate

      form[`${field.name}_end`] = range.endDate

      form[`${field.name}_current`] = String(range.current)

      return
    }

    if (field.type === "list" || field.type === "images") {
      form[field.name] = Array.isArray(value) ? value.join("\n") : ""

      return
    }

    form[field.name] = value == null ? "" : String(value)
  })

  return form
}

export function toEntityDatabaseRow(
  form: EntityFormData,

  fields: AdminField[],
): EntityRow {
  const row: EntityRow = {}

  fields.forEach((field) => {
    if (field.type === "date-range") {
      row[field.name] =
        formatDateRange({
          startDate: form[`${field.name}_start`] ?? "",

          endDate: form[`${field.name}_end`] ?? "",

          current: form[`${field.name}_current`] === "true",
        }) || null

      return
    }

    const value = form[field.name]?.trim() ?? ""

    if (field.type === "list" || field.type === "images") {
      row[field.name] = value
        ? value

            .split("\n")

            .map((item) => item.trim())

            .filter(Boolean)
        : []

      return
    }

    row[field.name] = value || null
  })

  return row
}

export function validateEntityDateRange(
  form: EntityFormData,

  fields: AdminField[],
): string | null {
  const dateField = fields.find((field) => field.type === "date-range")

  if (!dateField) return null

  const start = form[`${dateField.name}_start`] ?? ""

  const end = form[`${dateField.name}_end`] ?? ""

  const current = form[`${dateField.name}_current`] === "true"

  return start && end && !current && end < start
    ? "Tanggal akhir tidak boleh sebelum tanggal mulai."
    : null
}
