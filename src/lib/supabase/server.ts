import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import type { Session } from "@supabase/supabase-js"

export function getSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({ name, value }))
        },
      },
    }
  )
}

export async function getSupabaseSession(): Promise<Session | null> {
  const supabase = getSupabaseServerClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Failed to fetch Supabase session", error)
    return null
  }

  return session
}

export async function requireSupabaseSession() {
  const session = await getSupabaseSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}
