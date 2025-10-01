import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { verifyToken, type AdminUser } from "./auth"

const ADMIN_LOGIN_PATH = "/admin/login"

// Retrieve the currently authenticated admin user (if any)
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-token")?.value

  if (!token) {
    return null
  }

  return await verifyToken(token)
}

// Ensure an admin user is present; otherwise redirect to login
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentAdmin()

  if (!user) {
    redirect(ADMIN_LOGIN_PATH)
  }

  return user
}
