"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import type { FormEvent } from "react"

import { useSupabase } from "../SupabaseProvider"

export default function LoginForm() {
  const { supabase } = useSupabase()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = (formData.get("email") ?? "") as string
    const password = (formData.get("password") ?? "") as string

    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      return
    }

    startTransition(() => {
      router.replace(callbackUrl)
      router.refresh()
    })
  }

  return (
  <form onSubmit={handleSubmit} className="w-full space-y-5">
      <label className="flex flex-col gap-2 text-left text-sm text-slate-100">
        Email
        <input
          name="email"
          type="email"
          required
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-2 text-left text-sm text-slate-100">
        Password
        <input
          name="password"
          type="password"
          required
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-tropical-teal focus:outline-none"
        />
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-tropical-teal px-5 py-2 text-sm font-medium text-white shadow-lg shadow-tropical-teal/30 transition hover:bg-tropical-teal/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  )
}
