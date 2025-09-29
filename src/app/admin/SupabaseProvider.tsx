"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Session, SupabaseClient } from "@supabase/supabase-js"

import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface SupabaseContextValue {
  supabase: SupabaseClient
  session: Session | null
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined)

export function SupabaseProvider({ children, initialSession }: { children: React.ReactNode; initialSession: Session | null }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), [])
  const [session, setSession] = useState<Session | null>(initialSession)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (!session) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          setSession(data.session)
        }
      })
    }
  }, [session, supabase])

  const value = useMemo(() => ({ supabase, session }), [supabase, session])

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
