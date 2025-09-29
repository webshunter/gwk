"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { useSupabase } from "./SupabaseProvider"

export default function SignOutButton() {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleClick() {
    await supabase.auth.signOut()
    startTransition(() => {
      router.replace("/admin/login")
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? "Keluar..." : "Keluar"}
    </button>
  )
}
