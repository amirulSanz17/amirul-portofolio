import { useState } from "react"

import EntityFields from "./EntityFields"

import { useEntityManager } from "./entity-manager/useEntityManager"

import type { EntityConfig } from "./types"

function getDisplayValue(value: unknown) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean).join(", ")
  if (value == null) return ""
  return String(value).trim()
}

export default function EntityManager({ config }: { config: EntityConfig }) {
  const manager = useEntityManager(config)
  const [expandedId, setExpandedId] = useState<string | null>(null)

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

        <button
          type="button"
          className="btn-primary"
          onClick={manager.resetForm}
        >
          + Tambah baru
        </button>
      </div>

      {manager.error && (
        <p className="admin-alert admin-alert-error">{manager.error}</p>
      )}
      {manager.notice && (
        <p className="admin-alert admin-alert-success">{manager.notice}</p>
      )}

      <div className="admin-manager-layout">
        <section className="admin-records card">
          <h2>Konten ({manager.rows.length})</h2>

          {manager.loading ? (
            <p className="admin-muted">Memuat data...</p>
          ) : manager.rows.length === 0 ? (
            <p className="admin-muted">Belum ada data.</p>
          ) : (
            <div className="admin-record-list">
              {manager.rows.map((row) => {
                const rowId = String(row.id)
                const expanded = expandedId === rowId
                const populatedFields = config.fields.filter((field) =>
                  getDisplayValue(row[field.name]),
                )
                const previewFields = populatedFields
                  .filter(
                    (field) =>
                      field.type !== "image" && field.type !== "images",
                  )
                  .slice(0, 2)

                return (
                  <article
                    key={rowId}
                    className={`admin-record-card ${
                      manager.selected?.id === row.id ? "selected" : ""
                    }`}
                  >
                    <div className="admin-record-heading">
                      <div className="admin-record-summary">
                        <h3>
                          {String(row[config.titleField] ?? "(Tanpa judul)")}
                        </h3>
                        {previewFields.map((field) => (
                          <p key={field.name}>
                            <span>{field.label}:</span>{" "}
                            {getDisplayValue(row[field.name])}
                          </p>
                        ))}
                      </div>
                      <div className="admin-record-actions">
                        <button
                          type="button"
                          className="admin-action-edit"
                          onClick={() => manager.editRow(row)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-delete"
                          onClick={() => void manager.deleteRow(row)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="admin-preview-toggle"
                      aria-expanded={expanded}
                      onClick={() => setExpandedId(expanded ? null : rowId)}
                    >
                      {expanded ? "Tutup detail" : "Lihat semua detail"}
                      <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>

                    {expanded && (
                      <dl className="admin-record-details">
                        {config.fields.map((field) => {
                          const value = row[field.name]
                          const values = Array.isArray(value)
                            ? value.map(String).filter(Boolean)
                            : value == null
                              ? []
                              : [String(value).trim()].filter(Boolean)
                          const isImage =
                            field.type === "image" || field.type === "images"

                          return (
                            <div
                              key={field.name}
                              className={`admin-record-detail ${
                                isImage ? "admin-record-detail-images" : ""
                              }`}
                            >
                              <dt>{field.label}</dt>
                              <dd>
                                {isImage && values.length > 0 ? (
                                  <div className="admin-preview-images">
                                    {values.map((image, index) => (
                                      <img
                                        key={`${image}-${index}`}
                                        src={image}
                                        alt={`${field.label} ${index + 1}`}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  values.join(", ") || (
                                    <span className="admin-muted">
                                      Belum diisi
                                    </span>
                                  )
                                )}
                              </dd>
                            </div>
                          )
                        })}
                      </dl>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <form className="admin-editor card" onSubmit={manager.save}>
          <div className="admin-editor-heading">
            <h2>{manager.selected ? "Edit konten" : "Konten baru"}</h2>
            {manager.selected && (
              <button
                type="button"
                className="btn-ghost"
                onClick={manager.resetForm}
              >
                Batal edit
              </button>
            )}
          </div>

          <div className="admin-form-grid">
            <EntityFields
              fields={config.fields}
              form={manager.form}
              uploading={manager.uploading}
              onChange={manager.updateField}
              onStartDateChange={manager.updateStartDate}
              onCurrentChange={manager.updateCurrent}
              onUpload={(field, files) =>
                void manager.uploadImage(field, files)
              }
              onRemoveImage={manager.removeImage}
            />
          </div>

          <button
            type="submit"
            className="btn-primary admin-submit"
            disabled={manager.saving || manager.uploading}
          >
            {manager.saving
              ? "Menyimpan..."
              : manager.uploading
                ? "Upload..."
                : "Simpan"}
          </button>
        </form>
      </div>
    </>
  )
}
