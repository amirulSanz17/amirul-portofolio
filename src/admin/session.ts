import { supabase } from "../lib/supabase"

export const ADMIN_IDLE_TIMEOUT_MS = 5 * 60 * 1000

const ADMIN_UID = "c8ba1928-67f3-48df-9cb5-94a2041eee42"

export async function clearAdminSession(): Promise<void> {
  const {
    data: { session },

    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) throw sessionError

  if (!session) return

  const isAdmin =
    session.user.id === ADMIN_UID || session.user.app_metadata.role === "admin"

  if (!isAdmin) return

  const { error } = await supabase.auth.signOut({ scope: "local" })

  if (error) throw error
}
