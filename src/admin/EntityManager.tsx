import EntityFields from "./EntityFields"

import { useEntityManager } from "./entity-manager/useEntityManager"

import type { EntityConfig } from "./types"

export default function EntityManager({ config }: { config: EntityConfig }) {
  const manager = useEntityManager(config)

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
              {manager.rows.map((row) => (
                <article
                  key={String(row.id)}
                  className={`admin-record ${
                    manager.selected?.id === row.id ? "selected" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="admin-record-name"
                    onClick={() => manager.editRow(row)}
                  >
                    {String(row[config.titleField] ?? "(Tanpa judul)")}
                    <span className="admin-record-edit-label">Edit</span>
                  </button>

                  <button
                    type="button"
                    className="admin-delete"
                    onClick={() => void manager.deleteRow(row)}
                  >
                    Hapus
                  </button>
                </article>
              ))}
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
