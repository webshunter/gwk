import type { Metadata } from "next"
import Link from "next/link"

import { SupabaseProvider } from "./SupabaseProvider"
import SignOutButton from "./SignOutButton"

import { requireSupabaseSession } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Admin CMS | GWK",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireSupabaseSession()
  const user = session.user

  return (
    <SupabaseProvider initialSession={session}>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 py-4">
            <Link href="/admin" className="text-lg font-semibold uppercase tracking-wide">
              GWK Admin
            </Link>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url as string}
                  alt={(user.user_metadata.full_name as string) ?? user.email ?? "Admin"}
                  className="h-8 w-8 rounded-full border border-slate-700"
                />
              ) : null}
              <div className="leading-tight">
                <p className="font-medium">{(user.user_metadata.full_name as string) ?? user.email}</p>
                <p className="text-xs text-slate-400">Admin editor</p>
              </div>
              <SignOutButton />
            </div>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-6xl flex-1 px-8 py-10">{children}</main>
      </div>
    </SupabaseProvider>
  )
}
