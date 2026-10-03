import { useCallback, useEffect, useState, type FormEvent } from "react"

import { supabase } from "../lib/supabase"

import { formatDateRange, parseDateRange } from "../utils/dateRange"

import EntityFields from "./EntityFields"

import type {
  AdminField,
  EntityConfig,
  EntityFormData,
  EntityRow,
} from "./types"

type Row = EntityRow

type FormData = EntityFormData

const ADMIN_UID = "c8ba1928-67f3-48df-9cb5-94a2041eee42"

const BUCKET = "portfolio"

const MAX_SIZE = 8 * 1024 * 1024

const IMAGE_TYPES = [
  "image/jpeg",

  "image/png",

  "image/gif",

  "image/webp",

  "image/avif",
]

function createForm(row: Row | null, fields: AdminField[]): FormData {
  const result: FormData = {}

  fields.forEach((field) => {
    const value = row?.[field.name]

    if (field.type === "date-range") {
      const range = parseDateRange(value == null ? "" : String(value))

      result[`${field.name}_start`] = range.startDate

      result[`${field.name}_end`] = range.endDate

      result[`${field.name}_current`] = String(range.current)

      return
    }

    if (field.type === "list" || field.type === "images") {
      result[field.name] = Array.isArray(value) ? value.join("\n") : ""

      return
    }

    result[field.name] = value == null ? "" : String(value)
  })

  return result
}

function formToDatabase(form: FormData, fields: AdminField[]): Row {
  const result: Row = {}

  fields.forEach((field) => {
    if (field.type === "date-range") {
      result[field.name] =
        formatDateRange({
          startDate: form[`${field.name}_start`] ?? "",

          endDate: form[`${field.name}_end`] ?? "",

          current: form[`${field.name}_current`] === "true",
        }) || null

      return
    }

    const value = form[field.name]?.trim() ?? ""

    if (field.type === "list" || field.type === "images") {
      result[field.name] = value
        ? value

            .split("\n")

            .map((item) => item.trim())

            .filter(Boolean)
        : []

      return
    }

    result[field.name] = value || null
  })

  return result
}

function safeFileName(name: string) {
  return name

    .toLowerCase()

    .replace(/[^a-z0-9.-]+/g, "-")

    .replace(/-+/g, "-")

    .replace(/^-|-$/g, "")
}

export default function EntityManager({ config }: { config: EntityConfig }) {
  const [rows, setRows] = useState<Row[]>([])

  const [selected, setSelected] = useState<Row | null>(null)

  const [form, setForm] = useState<FormData>(() =>
    createForm(null, config.fields),
  )

  const [loading, setLoading] = useState(true)

  const [saving, setSaving] = useState(false)

  const [uploading, setUploading] = useState(false)

  const [error, setError] = useState("")

  const [notice, setNotice] = useState("")

  const loadRows = useCallback(async () => {
    setLoading(true)

    setError("")

    const { data, error } = await supabase

      .from(config.table)

      .select("*")

      .order("created_at", {
        ascending: false,
      })

    if (error) {
      setError(error.message)
    } else {
      setRows((data ?? []) as Row[])
    }

    setLoading(false)
  }, [config.table])

  useEffect(() => {
    void loadRows()
  }, [loadRows])

  function resetForm() {
    setSelected(null)

    setForm(createForm(null, config.fields))

    setError("")

    setNotice("")
  }

  function editRow(row: Row) {
    setSelected(row)

    setForm(createForm(row, config.fields))

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
    if (files.length === 0) {
      return
    }

    setError("")

    setNotice("")

    setUploading(true)

    try {
      // ================================

      // 1. CHECK SESSION

      // ================================

      const {
        data: { session },

        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        throw sessionError
      }

      if (!session) {
        throw new Error("Sesi admin tidak ditemukan. Silakan login kembali.")
      }

      // ================================

      // 2. CHECK ADMIN

      // ================================

      if (session.user.id !== ADMIN_UID) {
        throw new Error("Akun ini bukan akun admin.")
      }

      // ================================

      // 3. UPLOAD

      // ================================

      const uploadedUrls: string[] = []

      for (const file of files) {
        // -------------------------------

        // File size

        // -------------------------------

        if (file.size > MAX_SIZE) {
          throw new Error(`${file.name} melebihi batas 8 MB.`)
        }

        // -------------------------------

        // File type

        // -------------------------------

        if (!IMAGE_TYPES.includes(file.type)) {
          throw new Error(`${file.name} bukan format gambar yang didukung.`)
        }

        // -------------------------------

        // File name

        // -------------------------------

        const fileName = safeFileName(file.name)

        const uniqueFileName = `${Date.now()}-${crypto.randomUUID()}-${fileName}`

        // -------------------------------

        // Folder

        // -------------------------------

        const filePath = `${config.table}/${uniqueFileName}`

        console.log("Uploading:", filePath)

        // -------------------------------

        // Upload ke Supabase

        // -------------------------------

        const { data: uploadData, error: uploadError } = await supabase.storage

          .from(BUCKET)

          .upload(filePath, file, {
            cacheControl: "3600",

            contentType: file.type,

            upsert: false,
          })

        console.log("Upload response:", uploadData)

        if (uploadError) {
          console.error("Supabase Storage upload error:", uploadError)

          throw new Error(`Upload ${file.name} gagal: ${uploadError.message}`)
        }

        // -------------------------------

        // Public URL

        // -------------------------------

        const { data: publicUrlData } = supabase.storage

          .from(BUCKET)

          .getPublicUrl(filePath)

        const publicUrl = publicUrlData.publicUrl

        if (!publicUrl) {
          throw new Error("Public URL gambar tidak berhasil dibuat.")
        }

        console.log("Public URL:", publicUrl)

        uploadedUrls.push(publicUrl)
      }

      // ================================

      // 4. MASUKKAN URL KE FORM

      // ================================

      setForm((previous) => {
        const currentImages = (previous[field.name] ?? "")

          .split("\n")

          .filter(Boolean)

        let newImages: string[]

        if (field.type === "image") {
          // Cover hanya satu gambar

          newImages = [uploadedUrls[uploadedUrls.length - 1]]
        } else {
          // Gallery bisa banyak

          newImages = [...currentImages, ...uploadedUrls]
        }

        return {
          ...previous,

          [field.name]: newImages.join("\n"),
        }
      })

      setNotice(
        `${uploadedUrls.length} gambar berhasil diupload ke Supabase Storage.`,
      )
    } catch (err) {
      console.error("UPLOAD IMAGE ERROR:", err)

      setError(err instanceof Error ? err.message : "Upload gambar gagal.")
    } finally {
      setUploading(false)
    }
  }

  function removeImage(fieldName: string, index: number) {
    setForm((previous) => {
      const images = (previous[fieldName] ?? "").split("\n").filter(Boolean)

      images.splice(index, 1)

      return {
        ...previous,

        [fieldName]: images.join("\n"),
      }
    })
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    setNotice("")

    const dateField = config.fields.find(
      (field) => field.type === "date-range",
    )

    if (dateField) {
      const start = form[`${dateField.name}_start`] ?? ""

      const end = form[`${dateField.name}_end`] ?? ""

      const current = form[`${dateField.name}_current`] === "true"

      if (start && end && !current && end < start) {
        setError("Tanggal akhir tidak boleh sebelum tanggal mulai.")

        return
      }
    }

    setSaving(true)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error("Sesi admin sudah berakhir. Silakan login kembali.")
      }

      if (session.user.id !== ADMIN_UID) {
        throw new Error("Akun ini bukan akun admin.")
      }

      const data = formToDatabase(form, config.fields)

      if (selected) {
        const { error } = await supabase

          .from(config.table)

          .update(data)

          .eq("id", selected.id)

        if (error) throw error

        setNotice("Data berhasil diperbarui.")
      } else {
        const id = `${config.table}-${crypto.randomUUID()}`

        const { error } = await supabase.from(config.table).insert({
          id,

          ...data,
        })

        if (error) throw error

        setNotice("Data berhasil ditambahkan.")
      }

      setSelected(null)

      setForm(createForm(null, config.fields))

      await loadRows()
    } catch (err) {
      console.error("Save error:", err)

      setError(err instanceof Error ? err.message : "Gagal menyimpan data.")
    } finally {
      setSaving(false)
    }
  }

  async function deleteRow(row: Row) {
    const name = String(row[config.titleField] ?? "konten ini")

    if (!window.confirm(`Hapus "${name}"?`)) {
      return
    }

    setError("")

    setNotice("")

    const { error } = await supabase

      .from(config.table)

      .delete()

      .eq("id", row.id)

    if (error) {
      setError(error.message)

      return
    }

    if (selected?.id === row.id) {
      resetForm()
    }

    setNotice("Data berhasil dihapus.")

    await loadRows()
  }

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="section-label">Manage portfolio</p>

          <h1 className="section-title">{config.title}</h1>

          <p className="admin-muted">
            Data disimpan ke Supabase <code>{config.table}</code>.
          </p>
        </div>

        <button type="button" className="btn-primary" onClick={resetForm}>
          + Tambah baru
        </button>
      </div>

      {error && <p className="admin-alert admin-alert-error">{error}</p>}

      {notice && <p className="admin-alert admin-alert-success">{notice}</p>}

      <div className="admin-manager-layout">
        <section className="admin-records card">
          <h2>Konten ({rows.length})</h2>

          {loading ? (
            <p className="admin-muted">Memuat data...</p>
          ) : rows.length === 0 ? (
            <p className="admin-muted">Belum ada data.</p>
          ) : (
            <div className="admin-record-list">
              {rows.map((row) => (
                <article
                  key={String(row.id)}
                  className={`admin-record ${
                    selected?.id === row.id ? "selected" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="admin-record-name"
                    onClick={() => editRow(row)}
                  >
                    {String(row[config.titleField] ?? "(Tanpa judul)")}

                    <span className="admin-record-edit-label">Edit</span>
                  </button>

                  <button
                    type="button"
                    className="admin-delete"
                    onClick={() => void deleteRow(row)}
                  >
                    Hapus
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <form className="admin-editor card" onSubmit={save}>
          <div className="admin-editor-heading">
            <h2>{selected ? "Edit konten" : "Konten baru"}</h2>

            {selected && (
              <button type="button" className="btn-ghost" onClick={resetForm}>
                Batal edit
              </button>
            )}
          </div>

          <div className="admin-form-grid">
            <EntityFields
              fields={config.fields}
              form={form}
              uploading={uploading}
              onChange={updateField}
              onStartDateChange={updateStartDate}
              onCurrentChange={updateCurrent}
              onUpload={(field, files) => void uploadImage(field, files)}
              onRemoveImage={removeImage}
            />
          </div>

          <button
            type="submit"
            className="btn-primary admin-submit"
            disabled={saving || uploading}
          >
            {saving ? "Menyimpan..." : uploading ? "Upload..." : "Simpan"}
          </button>
        </form>
      </div>
    </>
  )
}
