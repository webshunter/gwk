"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function SignOutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleClick() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        console.error("Logout failed:", data)
      }
    } catch (error) {
      console.error("Logout request failed:", error)
    }

    startTransition(() => {
      router.replace("/admin/login")
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 px-4 py-2 text-sm font-medium text-red-200 transition-all duration-200 hover:from-red-500/20 hover:to-pink-500/20 hover:border-red-400/30 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex items-center gap-2">
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-red-300/30 border-t-red-300 rounded-full animate-spin"></div>
            <span>Keluar...</span>
          </>
        ) : (
          <>
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </>
        )}
      </div>
    </button>
  )
}
