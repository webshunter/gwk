import { NextResponse } from 'next/server'

export async function POST() {
  // Create response and clear the token cookie
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  )

  // Delete the admin token cookie
  response.cookies.delete('admin-token')

  return response
}