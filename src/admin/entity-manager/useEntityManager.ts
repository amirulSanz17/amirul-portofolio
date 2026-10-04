import { useCallback, useEffect, useState, type FormEvent } from "react"

import type {
  AdminField,
  EntityConfig,
  EntityFormData,
  EntityRow,
} from "../types"

import {
  createEntityForm,
  toEntityDatabaseRow,
  validateEntityDateRange,
} from "./form"

import { deleteEntityRow, loadEntityRows, saveEntityRow } from "./repository"

import { addUploadedImages, removeImageAt, uploadEntityImages } from "./storage"

export function useEntityManager(config: EntityConfig) {
  const [rows, setRows] = useState<EntityRow[]>([])

  const [selected, setSelected] = useState<EntityRow | null>(null)

  const [form, setForm] = useState<EntityFormData>(() =>
    createEntityForm(null, config.fields),
  )

  const [loading, setLoading] = useState(true)

  const [saving, setSaving] = useState(false)

  const [uploading, setUploading] = useState(false)

  const [error, setError] = useState("")

  const [notice, setNotice] = useState("")

  const loadRows = useCallback(async () => {
    setLoading(true)

    setError("")

    try {
      setRows(await loadEntityRows(config.table))
    } catch (loadError) {
      console.error("Load content error:", loadError)

      setError(
        loadError instanceof Error ? loadError.message : "Gagal memuat data.",
      )
    } finally {
      setLoading(false)
    }
  }, [config.table])

  useEffect(() => {
    void loadRows()
  }, [loadRows])

  const resetForm = useCallback(() => {
    setSelected(null)

    setForm(createEntityForm(null, config.fields))

    setError("")

    setNotice("")
  }, [config.fields])

  function editRow(row: EntityRow) {
    setSelected(row)

    setForm(createEntityForm(row, config.fields))

    setError("")

    setNotice("")
  }

  function updateField(name: string, value: string) {
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function updateStartDate(name: string, value: string) {
    setForm((previous) => ({
      ...previous,

      [`${name}_start`]: value,

      [`${name}_end`]:
        previous[`${name}_end`] && previous[`${name}_end`] < value
          ? ""
          : previous[`${name}_end`],
    }))
  }

  function updateCurrent(name: string, checked: boolean) {
    setForm((previous) => ({
      ...previous,

      [`${name}_current`]: String(checked),

      [`${name}_end`]: checked ? "" : (previous[`${name}_end`] ?? ""),
    }))
  }

  async function uploadImage(field: AdminField, files: File[]) {
    if (files.length === 0) return

    setError("")

    setNotice("")

    setUploading(true)

    try {
      const urls = await uploadEntityImages(config.table, field, files)

      setForm((previous) => ({
        ...previous,

        [field.name]: addUploadedImages(
          previous[field.name] ?? "",
          field,
          urls,
        ),
      }))

      setNotice(`${urls.length} gambar berhasil diupload ke Supabase Storage.`)
    } catch (uploadError) {
      console.error("Upload image error:", uploadError)

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload gambar gagal.",
      )
    } finally {
      setUploading(false)
    }
  }

  function removeImage(fieldName: string, index: number) {
    setForm((previous) => ({
      ...previous,

      [fieldName]: removeImageAt(previous[fieldName] ?? "", index),
    }))
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    setNotice("")

    const dateError = validateEntityDateRange(form, config.fields)

    if (dateError) {
      setError(dateError)

      return
    }

    setSaving(true)

    try {
      await saveEntityRow(
        config,

        selected,

        toEntityDatabaseRow(form, config.fields),
      )

      setNotice(
        selected ? "Data berhasil diperbarui." : "Data berhasil ditambahkan.",
      )

      setSelected(null)

      setForm(createEntityForm(null, config.fields))

      await loadRows()
    } catch (saveError) {
      console.error("Save content error:", saveError)

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Gagal menyimpan data.",
      )
    } finally {
      setSaving(false)
    }
  }

  async function deleteRow(row: EntityRow) {
    const name = String(row[config.titleField] ?? "konten ini")

    if (!window.confirm(`Hapus "${name}"?`)) return

    setError("")

    setNotice("")

    try {
      await deleteEntityRow(config.table, row.id)

      if (selected?.id === row.id) resetForm()

      setNotice("Data berhasil dihapus.")

      await loadRows()
    } catch (deleteError) {
      console.error("Delete content error:", deleteError)

      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Gagal menghapus data.",
      )
    }
  }

  return {
    rows,

    selected,

    form,

    loading,

    saving,

    uploading,

    error,

    notice,

    resetForm,

    editRow,

    updateField,

    updateStartDate,

    updateCurrent,

    uploadImage,

    removeImage,

    save,

    deleteRow,
  }
}
