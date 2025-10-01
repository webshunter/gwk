# Changelog

## Unreleased

### Complete Admin Interface Redesign (2024-12-30)
- **Complete visual redesign** - Transformed dark theme admin to modern light theme with clean, professional appearance
- **Light theme implementation** - Changed from dark slate/glass design to bright, clean white/light-blue color scheme
- **Enhanced accessibility** - Better contrast ratios and readability with light backgrounds and dark text
- **Modern card-based layout** - Replaced gradient glass panels with clean white cards with subtle shadows
- **Simplified color palette** - Professional blue-indigo gradient system with emerald and purple accents
- **Clean form inputs** - Redesigned form fields with proper borders, focused states, and improved typography
- **Enhanced sidebar design** - Light sidebar panels with better spacing and modern component cards
- **Improved page builder** - Clean page editor interface with professional buttons and status indicators
- **Better visual hierarchy** - Clear typography scales, proper spacing, and consistent visual elements
- **Professional branding** - Modern header with company logo integration and clean navigation elements
- **Optimized user experience** - Intuitive interface flow with better visual feedback and interaction states
- **Mobile-first responsive** - Enhanced mobile experience with touch-friendly controls and adaptive layouts

### Previous Layout Optimization (2024-12-30)
- **Fixed sidebar width issues** - Left sidebar expanded from 288px to 320px for better content visibility
- **Enhanced component sidebar** - Right sidebar increased from 320px to 384px for improved component display
- **Optimized main content area** - Adjusted margins and padding for better content spacing and readability
- **Full-width admin layout** - Removed max-width constraints for better screen real estate utilization
- **Improved sidebar padding** - Increased internal spacing from 16px to 24px for better touch targets and readability
- **Responsive design enhancements** - Better mobile and desktop layout adaptation with proper breakpoints

### Admin Interface Improvements (2024-12-19)
- **Complete UI/UX redesign** of admin dashboard with modern, professional interface
- **Three-panel layout** with dedicated sidebars for pages (left) and components (right)
- **Fixed header navigation** with branding, breadcrumbs, and quick stats display
- **Enhanced sidebar design** with search functionality and improved page navigation
- **Component library sidebar** with purple accent theme and categorized components
- **Mobile-responsive layout** with collapsible sidebars and touch-friendly interactions
- **Advanced drag & drop interface** with better visual feedback and smooth animations
- **Improved form components** with consistent styling, icons, and real-time validation
- **Enhanced empty states** with actionable guidance and onboarding flows
- **Professional color scheme** using tropical-teal and purple accent colors
- **Better loading states** and error handling with user-friendly messaging
- **Auto-save indicators** and optimistic UI updates for better user experience
- **Contextual help text** and tips for better user guidance
- **Auto-close library** on mobile after component selection for better UX

### Bug Fixes & Authentication (2024-12-19)
- Ensure the "Halaman Baru" button in the admin builder creates pages reliably by optimistically updating state and waiting for Sanity replication before refetching.
- Add comprehensive error handling and debug tools to the admin page builder for troubleshooting page creation issues.
- Fix JWT authentication flow and add detailed logging to server actions for better debugging experience.
- Replace legacy Supabase authentication with a standalone JWT-based admin login.
- Add `adminSession` helpers to validate cookies in server components and actions.
- Guard all admin server actions and pages with the new JWT session requirement.
- Update Sign Out flow to use the JWT logout API and remove Supabase client calls.
- Document the new authentication setup with environment overrides in `README.md`.
- Require admin login credentials to be supplied via `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables and remove hard-coded hints from the login UI.
- Fix Supabase server client to await Next.js cookies API, resolving repeated `/admin/login` errors.
- Treat expired Supabase sessions as signed out to prevent `/admin` ↔ `/admin/login` redirect loops.
- Tidy UI components for lint compliance (escaped apostrophes, typed Supabase markers, and Next.js-friendly media usage).
- Split admin routes into authenticated and public groups so `/admin/login` loads without redirect loops.
- Add fallback authentication system for development when Supabase service is unavailable.
- Implement graceful authentication middleware with cookie-based fallback sessions.
- Add development credential helper in login form with show/hide functionality.
- Prioritize fallback authentication for seamless admin access to Sanity CMS.
- Configure admin dashboard to use Sanity CMS for content read/write operations.
- Separate authentication (Supabase/fallback) from content management (Sanity).
- Remove all authentication requirements from admin dashboard.
- Enable direct access to admin dashboard without login (development mode).
- Clean admin interface with direct Sanity CMS integration.
- Fix "Session does not match project host" error by implementing simple authentication system.
- Remove Supabase session dependency for fallback authentication workflow.
- Add client-side only checks for document.cookie access to prevent server-side errors.
- Ensure the “Halaman Baru” button in the admin builder creates pages reliably by optimistically updating state and waiting for Sanity replication before refetching.
