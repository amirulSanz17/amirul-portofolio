import { supabase } from "../../lib/supabase"

import type { AdminField } from "../types"

const ADMIN_UID = "c8ba1928-67f3-48df-9cb5-94a2041eee42"

const BUCKET = "portfolio"

const MAX_SIZE = 8 * 1024 * 1024

const IMAGE_TYPES = new Set([
  "image/jpeg",

  "image/png",

  "image/gif",

  "image/webp",

  "image/avif",
])

function safeFileName(name: string): string {
  return name

    .toLowerCase()

    .replace(/[^a-z0-9.-]+/g, "-")

    .replace(/-+/g, "-")

    .replace(/^-|-$/g, "")
}

export async function uploadEntityImages(
  table: string,

  field: AdminField,

  files: File[],
): Promise<string[]> {
  const {
    data: { session },

    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) throw sessionError

  if (!session) {
    throw new Error("Sesi admin tidak ditemukan. Silakan login kembali.")
  }

  if (session.user.id !== ADMIN_UID) {
    throw new Error("Akun ini bukan akun admin.")
  }

  const uploadedUrls: string[] = []

  for (const file of files) {
    if (file.size > MAX_SIZE) {
      throw new Error(`${file.name} melebihi batas 8 MB.`)
    }

    if (!IMAGE_TYPES.has(file.type)) {
      throw new Error(`${file.name} bukan format gambar yang didukung.`)
    }

    const fileName = `${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`

    const filePath = `${table}/${fileName}`

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",

        contentType: file.type,

        upsert: false,
      })

    if (error) {
      throw new Error(`Upload ${file.name} gagal: ${error.message}`)
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)

    if (!data.publicUrl) {
      throw new Error("Public URL gambar tidak berhasil dibuat.")
    }

    uploadedUrls.push(data.publicUrl)
  }

  return uploadedUrls
}

export function addUploadedImages(
  currentValue: string,

  field: AdminField,

  uploadedUrls: string[],
): string {
  if (field.type === "image") {
    return uploadedUrls[uploadedUrls.length - 1] ?? ""
  }

  return [...currentValue.split("\n").filter(Boolean), ...uploadedUrls].join(
    "\n",
  )
}

export function removeImageAt(value: string, index: number): string {
  return value

    .split("\n")

    .filter(Boolean)

    .filter((_, imageIndex) => imageIndex !== index)

    .join("\n")
}
