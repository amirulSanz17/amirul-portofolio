import type { AdminField, EntityFormData } from "./types"

interface EntityFieldsProps {
  fields: AdminField[]

  form: EntityFormData

  uploading: boolean

  onChange: (name: string, value: string) => void

  onStartDateChange: (name: string, value: string) => void

  onCurrentChange: (name: string, checked: boolean) => void

  onUpload: (field: AdminField, files: File[]) => void

  onRemoveImage: (fieldName: string, index: number) => void
}

export default function EntityFields({
  fields,

  form,

  uploading,

  onChange,

  onStartDateChange,

  onCurrentChange,

  onUpload,

  onRemoveImage,
}: EntityFieldsProps) {
  return (
    <>
      {fields.map((field) => (
        <div
          key={field.name}
          className={`admin-field ${
            ["textarea", "list", "images", "date-range"].includes(
              field.type ?? "",
            )
              ? "admin-field-wide"
              : ""
          }`}
        >
          <span>
            {field.label}
            {field.required ? " *" : ""}
          </span>

          {field.type === "date-range" ? (
            <>
              <div className="admin-date-range">
                <label className="admin-date-part">
                  <span>Tanggal mulai</span>
                  <input
                    type="date"
                    value={form[`${field.name}_start`] ?? ""}
                    onChange={(event) =>
                      onStartDateChange(field.name, event.target.value)
                    }
                    required={field.required}
                  />
                </label>

                <label className="admin-date-part">
                  <span>Tanggal akhir</span>
                  <input
                    type="date"
                    value={form[`${field.name}_end`] ?? ""}
                    min={form[`${field.name}_start`] ?? ""}
                    disabled={form[`${field.name}_current`] === "true"}
                    onChange={(event) =>
                      onChange(`${field.name}_end`, event.target.value)
                    }
                  />
                </label>
              </div>

              <label className="admin-current-checkbox">
                <input
                  type="checkbox"
                  checked={form[`${field.name}_current`] === "true"}
                  onChange={(event) =>
                    onCurrentChange(field.name, event.target.checked)
                  }
                />
                <span>Sampai saat ini</span>
              </label>
            </>
          ) : field.type === "image" || field.type === "images" ? (
            <>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                multiple={field.type === "images"}
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files ?? [])

                  event.currentTarget.value = ""

                  if (files.length > 0) onUpload(field, files)
                }}
              />
              <span className="admin-muted">
                JPG, PNG, GIF, WebP, AVIF. Maksimal 8 MB.
              </span>

              {(form[field.name] ?? "")

                .split("\n")

                .filter(Boolean)

                .map((image, index) => (
                  <span className="admin-image-path" key={`${image}-${index}`}>
                    <img src={image} alt="" />
                    <code>{image}</code>
                    <button
                      type="button"
                      className="admin-delete"
                      onClick={() => onRemoveImage(field.name, index)}
                    >
                      Hapus
                    </button>
                  </span>
                ))}

              {uploading && <span className="admin-muted">Mengupload...</span>}
            </>
          ) : field.type === "textarea" || field.type === "list" ? (
            <textarea
              rows={field.type === "list" ? 4 : 3}
              placeholder={field.type === "list" ? "Satu item per baris" : ""}
              value={form[field.name] ?? ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              required={field.required}
            />
          ) : field.type === "select" ? (
            <select
              value={form[field.name] ?? ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              required={field.required}
            >
              <option value="">Pilih {field.label.toLowerCase()}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type ?? "text"}
              value={form[field.name] ?? ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              required={field.required}
            />
          )}
        </div>
      ))}
    </>
  )
}
