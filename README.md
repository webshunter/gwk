# GWK Project

## Supabase Auth Setup

The custom admin area (`/admin`) now uses Supabase for authentication. Follow these steps before running the app locally:

1. Create a Supabase project and enable the **Email / Password** provider.
2. Copy the API values from **Settings → API** and add them to `.env.local`:

	```bash
	NEXT_PUBLIC_SUPABASE_URL=your-project-url
	NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
	SUPABASE_SERVICE_ROLE=optional-service-role-key
	```

	The service role key is only required if you plan to seed or manage users programmatically.

3. Add at least one admin user from **Authentication → Users** and set a password manually (disable public sign-ups if the admin is private).

4. Restart the dev server after updating environment variables.

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/admin/login` to sign in with the Supabase credentials.
