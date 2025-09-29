import { redirect } from "next/navigation"

import { SupabaseProvider } from "../SupabaseProvider"
import LoginForm from "./LoginForm"

import { getSupabaseSession } from "@/lib/supabase/server"

export default async function AdminLoginPage() {
  const session = await getSupabaseSession()

  if (session) {
    redirect("/admin")
  }

  return (
    <SupabaseProvider initialSession={null}>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6 px-6 text-center text-slate-100">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Masuk ke GWK Admin</h1>
          <p className="text-sm text-slate-400">
            Gunakan kredensial Supabase Admin untuk mengelola halaman secara kustom.
          </p>
        </div>
        <LoginForm />
      </div>
    </SupabaseProvider>
  )
}
