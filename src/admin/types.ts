export interface AdminField {
  name: string

  label: string

  type?: "text" | "url" | "textarea" | "list" | "select" | "image" | "images" | "date-range"

  options?: string[]

  required?: boolean
}

export interface EntityConfig {
  table: string

  title: string

  titleField: string

  fields: AdminField[]
}

export type EntityRow = Record<string, unknown>

export type EntityFormData = Record<string, string>
