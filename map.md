# GWK Project Structure Map

## 📋 Project Overview
**Project Name:** GWK (Garuda Wisnu Kencana) Admin Panel  
**Framework:** Next.js 15.4.5 with React 19.1.0  
**CMS:** Sanity v4.10.1  
**Styling:** Custom CSS (no Tailwind/Bootstrap)  
**Deployment:** PM2  

## 🏗️ Project Architecture

### Core Technologies
- **Frontend:** Next.js 15.4.5 + React 19.1.0
- **CMS:** Sanity v4.10.1
- **Animation:** GSAP v3.13.0
- **UI Components:** Custom CSS + Lucide React Icons
- **Drag & Drop:** @dnd-kit
- **Authentication:** Custom JWT + NextAuth
- **Database:** Sanity (Headless CMS)

## 📁 Directory Structure

### Root Level
```
gwk/
├── 📄 package.json          # Dependencies & scripts
├── 📄 next.config.ts        # Next.js configuration
├── 📄 sanity.config.ts      # Sanity Studio configuration
├── 📄 tsconfig.json         # TypeScript configuration
├── 📄 CHANGELOG.md          # Project changelog
├── 📄 history.txt           # Development history
├── 📁 public/               # Static assets
├── 📁 src/                  # Source code
└── 📁 log/                  # Application logs
```

### Public Assets (`/public/`)
```
public/
├── 📁 images/               # Image assets organized by page
│   ├── 📁 homepage/         # Homepage images
│   ├── 📁 balinese-cultural/ # Cultural page images
│   ├── 📁 facility/         # Facility page images
│   ├── 📁 mice-event/       # MICE event images
│   ├── 📁 wedding/          # Wedding page images
│   └── 📁 regular-events/   # Regular events images
├── 📁 icon/                 # UI icons and borders
└── 📁 ornament/             # Decorative elements
```

## 🎯 Sanity CMS Structure

### Schema Types (`/src/sanity/schemaTypes/`)
```typescript
// Main Schema Types
├── 📄 template.ts           # Page template (main document type)
├── 📄 heroSection.ts        # Hero section component
├── 📄 featureSection.ts     # Feature section component
├── 📄 testimonialSection.ts # Testimonial section component
└── 📄 index.ts             # Schema exports
```

### Template Schema (Main Document)
```typescript
template: {
  title: string (required, min 3 chars)
  slug: slug (required, auto-generated from title)
  heroImage: image (hotspot enabled)
  summary: text (3 rows)
  sections: array of sections (drag & drop enabled)
  content: array of blocks (rich text)
}
```

### Section Types
1. **Hero Section**
   - title, subtitle, description
   - media (image/video)
   - CTA (label + href)
   - theme (light/dark)

2. **Feature Section**
   - title, description
   - features array (heading, body, icon)

3. **Testimonial Section**
   - title
   - testimonials array (quote, author, role, avatar)

### Sanity Configuration
- **Studio Path:** `/studio`
- **Project ID:** From environment
- **Dataset:** From environment
- **Plugins:** Structure Tool, Vision Tool

## 🎨 Frontend Structure

### App Router (`/src/app/`)
```
app/
├── 📄 layout.tsx            # Root layout
├── 📄 page.tsx             # Homepage
├── 📄 globals.css          # Global styles
├── 📁 admin/               # Admin panel
├── 📁 api/                 # API routes
├── 📁 studio/              # Sanity Studio
└── 📁 [pages]/             # Public pages
```

### Admin Panel (`/src/app/admin/`)
```
admin/
├── 📄 page.tsx             # Admin dashboard
├── 📄 layout.tsx           # Admin layout
├── 📄 actions.ts           # Server actions
├── 📄 sectionPresets.ts    # Section type definitions
├── 📁 pages/               # Page management
│   ├── 📄 page.tsx         # List pages
│   ├── 📁 create/          # Create new page
│   └── 📁 edit/[id]/       # Edit existing page
├── 📁 login/               # Authentication
├── 📁 ui/                  # Admin UI components
└── 📁 design/              # Design system
```

### Page Components (`/src/components/pages/`)
```
pages/
├── 📁 homepage/            # Homepage components
├── 📁 balinese-cultural/   # Cultural page
├── 📁 facility/            # Facility page
├── 📁 mice-event/          # MICE events page
├── 📁 wedding/             # Wedding page
├── 📁 cultural-performances/ # Performances page
├── 📁 top-of-statue-tour/  # Statue tour page
├── 📁 career/              # Career page
└── 📁 atraction-event-page/ # Attraction events
```

### UI Components (`/src/components/ui/`)
```
ui/
├── 📄 Button.tsx           # Button component
├── 📄 ModernButton.tsx     # Modern button variant
├── 📄 ModernCard.tsx       # Card component
├── 📄 ModernInput.tsx      # Input component
├── 📄 ModernTextarea.tsx   # Textarea component
├── 📄 StatusBadge.tsx      # Status indicator
├── 📄 ThemeToggle.tsx      # Theme switcher
├── 📄 AnimatedCard.tsx     # Animated card
├── 📄 EmptyState.tsx       # Empty state component
└── 📄 [other-ui-components]
```

## 🔧 API Structure (`/src/app/api/`)

### Authentication APIs
```
api/auth/
├── 📁 [...nextauth]/       # NextAuth configuration
├── 📁 login/               # Login endpoint
├── 📁 logout/              # Logout endpoint
└── 📁 me/                  # User info endpoint
```

### Content APIs
```
api/
├── 📁 pages/               # Page CRUD operations
│   ├── 📄 route.ts         # List/Create pages
│   └── 📁 [id]/            # Get/Update/Delete specific page
├── 📁 upload/              # File upload endpoint
└── 📁 debug/               # Debug endpoints
```

## 🎭 Page Types & Features

### Public Pages
1. **Homepage** - Main landing page
2. **Balinese Cultural** - Cultural information
3. **Facility** - Facility information
4. **MICE & Events** - Corporate events
5. **Wedding** - Wedding packages
6. **Cultural Performances** - Show schedules
7. **Top of Statue Tour** - Statue tour information
8. **Career** - Job opportunities
9. **Article** - News and articles

### Admin Features
- **Dashboard** - Analytics and overview
- **Page Management** - Create/Edit/Delete pages
- **Section Builder** - Drag & drop section editor
- **Content Management** - Manage all content types
- **Authentication** - Secure admin access

## 🔐 Authentication & Security

### Admin Authentication
- Custom JWT-based authentication
- NextAuth integration
- Session management
- Protected admin routes

### Security Features
- Input validation
- Error handling with logging
- Secure file uploads
- Environment variable protection

## 📊 Data Flow

### Content Creation Flow
1. Admin logs in → Dashboard
2. Navigate to Pages → Create/Edit
3. Use Section Builder → Add sections
4. Configure section content → Save
5. Content stored in Sanity → Published

### Public Page Rendering
1. User visits page → Next.js routing
2. Fetch data from Sanity → Server-side
3. Render components → Client-side
4. Display content → User sees page

## 🎨 Design System

### Typography
- **Inter** - Primary font (18pt, 24pt, 28pt variants)
- **Playfair Display** - Display font
- **Perfectly Vintages** - Decorative font

### Styling Approach
- Custom CSS (no framework dependencies)
- Modular CSS per component
- Responsive design
- Consistent color scheme
- Balinese cultural elements

## 🚀 Deployment & Performance

### PM2 Configuration
- Process management
- Auto-restart on failure
- Log management
- Production-ready

### Performance Optimizations
- Image optimization
- Lazy loading
- Code splitting
- GSAP animations
- Smooth scrolling (Lenis)

## 📝 Development Guidelines

### Code Standards
- Clean code principles
- Descriptive naming
- Component reusability
- Error handling
- Comprehensive logging

### File Organization
- Modular components
- Separate CSS files
- TypeScript throughout
- Clear folder structure
- Documentation in code

## 🔄 Content Management Workflow

1. **Content Creation**
   - Admin creates page in Sanity Studio
   - Defines page structure and sections
   - Adds content to each section

2. **Content Editing**
   - Admin accesses edit interface
   - Modifies existing content
   - Saves changes to Sanity

3. **Content Publishing**
   - Changes automatically reflect on frontend
   - Real-time updates via Sanity
   - Version control through Sanity

## 📈 Future Enhancements

### Planned Features
- Advanced analytics
- Multi-language support
- Advanced section types
- Content scheduling
- User management
- API rate limiting

### Technical Improvements
- Performance monitoring
- Error tracking
- Automated testing
- CI/CD pipeline
- Database optimization

---

*This map provides a comprehensive overview of the GWK project structure, helping developers understand the codebase organization and content management workflow.*