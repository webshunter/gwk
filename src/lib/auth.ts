import { SignJWT, jwtVerify } from 'jose'

function requireEnv(name: 'ADMIN_EMAIL' | 'ADMIN_PASSWORD' | 'JWT_SECRET'): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

// Admin credentials must be supplied via environment variables
const ADMIN_EMAIL = requireEnv('ADMIN_EMAIL')
const ADMIN_PASSWORD = requireEnv('ADMIN_PASSWORD')

// JWT secret - keep a sensible default for local dev but prefer env override
const JWT_SECRET = process.env.JWT_SECRET || 'gwk-admin-secret-key-2024'
const secret = new TextEncoder().encode(JWT_SECRET)

// JWT token expires in 24 hours
const TOKEN_EXPIRY = '24h'

export interface AdminUser {
  email: string
  name: string
  role: string
}

export async function validateCredentials(email: string, password: string): Promise<AdminUser | null> {
  // Simple credential check - in production, you might want to hash the password
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      email: ADMIN_EMAIL,
      name: 'GWK Admin',
      role: 'admin'
    }
  }
  return null
}

export async function createToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secret)

  return token
}

export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    
    return {
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string
    }
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}