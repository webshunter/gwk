"use client"

import { createBrowserClient } from "@supabase/ssr"

const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return document.cookie
            .split("; ")
            .filter(Boolean)
            .map((cookie) => {
              const [name, ...rest] = cookie.split("=")
              return {
                name,
                value: rest.join("="),
              }
            })
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            let cookieString = `${name}=${value}; Path=${options?.path ?? "/"}`
            if (options?.maxAge) {
              cookieString += `; Max-Age=${options.maxAge}`
            }
            if (options?.domain) {
              cookieString += `; Domain=${options.domain}`
            }
            if (options?.secure) {
              cookieString += `; Secure`
            }
            if (options?.sameSite) {
              cookieString += `; SameSite=${options.sameSite}`
            }
            document.cookie = cookieString
          })
        },
      },
    }
  )

type BrowserClient = ReturnType<typeof createClient>

let browserClient: BrowserClient | null = null

export function getSupabaseBrowserClient(): BrowserClient {
  if (!browserClient) {
    browserClient = createClient()
  }

  return browserClient
}
