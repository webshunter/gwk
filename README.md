# GWK Project

## Admin Authentication

The custom admin area (`/admin`) now uses a lightweight JWT-based login without any Supabase dependency. Credentials are **no longer hard-coded**; you must provide them through environment variables in `.env.local`:

```bash
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="super-secure-password"
JWT_SECRET="random-jwt-secret"
```

All deployments (including local development) require these values. The server will throw a clear error if either `ADMIN_EMAIL` or `ADMIN_PASSWORD` is missing.

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/admin/login` and sign in using the credentials defined in your environment file.
