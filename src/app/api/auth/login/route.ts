import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, createToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate credentials
    const user = await validateCredentials(email, password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken(user)

    // Create response with token in httpOnly cookie
    const response = NextResponse.json(
      { 
        success: true, 
        user: {
          email: user.email,
          name: user.name,
          role: user.role
        }
      },
      { status: 200 }
    )

    // Set httpOnly cookie with JWT token
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}