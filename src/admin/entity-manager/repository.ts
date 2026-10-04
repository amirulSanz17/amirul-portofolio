import { supabase } from "../../lib/supabase"

import type { EntityConfig, EntityRow } from "../types"

const ADMIN_UID = "c8ba1928-67f3-48df-9cb5-94a2041eee42"

export async function loadEntityRows(table: string): Promise<EntityRow[]> {
  const { data, error } = await supabase

    .from(table)

    .select("*")

    .order("created_at", { ascending: false })

  if (error) throw error

  return (data ?? []) as EntityRow[]
}

export async function saveEntityRow(
  config: EntityConfig,

  selected: EntityRow | null,

  data: EntityRow,
): Promise<void> {
  const {
    data: { session },

    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) throw sessionError

  if (!session) {
    throw new Error("Sesi admin sudah berakhir. Silakan login kembali.")
  }

  if (session.user.id !== ADMIN_UID) {
    throw new Error("Akun ini bukan akun admin.")
  }

  if (selected) {
    const { error } = await supabase

      .from(config.table)

      .update(data)

      .eq("id", selected.id)

    if (error) throw error

    return
  }

  const { error } = await supabase.from(config.table).insert({
    id: `${config.table}-${crypto.randomUUID()}`,

    ...data,
  })

  if (error) throw error
}

export async function deleteEntityRow(
  table: string,

  id: unknown,
): Promise<void> {
  const { error } = await supabase.from(table).delete().eq("id", id)

  if (error) throw error
}
