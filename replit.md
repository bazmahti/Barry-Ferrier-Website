# Doctor Baz - AI Video Artist & Experimental Filmmaker Portfolio

## User Preferences (MANDATORY - READ FIRST)

### CRITICAL: Production Data Sync Verification
**BEFORE every deployment/publish, the agent MUST verify that ALL development database content will sync to production.** This is non-negotiable. The site uses `server/seed.ts` with upsert logic to sync data on server startup. The following checks are REQUIRED before ANY publish:

1. **Compare record counts** - Query BOTH dev and production databases for projects, history_items, awards, videos, and images. Report exact counts side-by-side.
2. **Check for missing records** - Identify any records in dev that are NOT in production (by slug or title).
3. **Check for stale records** - Identify any production records missing data that exists in dev (e.g. empty image_url, null full_description, empty youtube_videos when dev has values).
4. **Verify seed.ts is current** - Confirm that `server/seed.ts` contains ALL projects, history items, awards, videos, and images from the dev database. If any dev records are NOT in seed.ts, update seed.ts BEFORE deploying.
5. **Report findings** - Present a clear summary table to the user showing what will sync, what's missing, and any potential issues.

**Never assume the seed file is up to date. Always verify by querying the dev database and comparing against seed.ts content.**

### CRITICAL: SEO Optimization Verification
**BEFORE every deployment/publish, the agent MUST verify that SEO is fully optimized for any new or updated content.** This is non-negotiable. The following checks are REQUIRED before ANY publish:

1. **New/updated pages have SEO component** - Every page must use the `<SEO>` component (from `@/components/SEO.tsx`) with a unique title, description, and canonical URL.
2. **Meta descriptions are current** - If page content has changed (new sections, updated text, new awards/projects), the meta description must reflect those changes.
3. **Open Graph & Twitter cards** - Confirm all pages have correct `og:title`, `og:description`, `og:image`, and `twitter:card` tags.
4. **Sitemap is current** - Check that `server/routes.ts` sitemap generation includes all active routes. Any new pages must be added to the sitemap. Any removed/hidden pages must be excluded.
5. **JSON-LD structured data** - Verify Person, Website, and BreadcrumbList schemas are accurate and reflect current content (e.g. updated award counts, new works).
6. **Keyword relevance** - Ensure per-page keywords in the SEO component match the current content focus.
7. **Report findings** - Present a brief SEO status summary to the user showing what was checked, any issues found, and fixes applied.

**Never assume SEO is up to date after content changes. Always verify meta tags, sitemap, and structured data before publishing.**

The live site is at https://barryferrier.com. The production database is separate from development. Data syncs via seed.ts upsert logic on server startup.

## Overview
A futuristic portfolio website for Doctor Baz (Dr. Barry Ferrier), positioning him as a cutting-edge AI video artist, electronic music pioneer, and award-winning experimental filmmaker. The site showcases his 40+ year career at the intersection of art and technology, featuring his award-winning film "Entombed" and book "Art, Soul and AI".

## Brand Positioning
- **Primary Identity**: AI Video Artist & Experimental Filmmaker
- **Secondary Identity**: Electronic Music Pioneer (Fairlight CMI, QPAC commissions)
- **Legacy**: 40+ years in music, theatre, and multimedia design
- **Key Achievements**: Best Experimental Film (NY Arthouse), 6 Dolphin Awards, PhD Multimedia

## Tech Stack
- **Frontend**: React 18 with TypeScript, Vite, TanStack Query
- **Styling**: Tailwind CSS with futuristic dark theme, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter for client-side routing

## Design System
- **Theme**: Futuristic/Cyberpunk - dark backgrounds with neon accents
- **Primary Color**: Neon Cyan (hsl 190 95% 55%)
- **Accent Colors**: Neon Magenta (hsl 320 90% 60%), Neon Purple (hsl 280 85% 65%)
- **Secondary**: Gold for awards/achievements
- **Typography**: Orbitron (headings - futuristic), Space Grotesk (body), JetBrains Mono (code/tech)
- **Visual Effects**: Animated gradients, floating particles, glowing text

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Header.tsx    # Futuristic nav with neon accents
│   │   │   ├── Footer.tsx    # Tech-styled footer
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Dynamic hero, featured work sections
│   │   │   ├── Entombed.tsx  # Award-winning AI film showcase
│   │   │   ├── Book.tsx      # "Art, Soul and AI" book page
│   │   │   ├── About.tsx     # Biography & credentials
│   │   │   ├── Projects.tsx  # Current musical projects
│   │   │   ├── History.tsx   # 40+ year career archive
│   │   │   ├── Awards.tsx    # Dolphin Awards & film recognition
│   │   │   ├── Videos.tsx    # Video portfolio
│   │   │   └── Contact.tsx   # Contact form
│   │   ├── lib/              # Utility functions
│   │   └── App.tsx           # Main app with routing
│   └── index.html
├── server/
│   ├── index.ts              # Express server entry
│   ├── routes.ts             # API routes
│   ├── storage.ts            # Database storage interface
│   └── seed.ts               # Database seeding
├── shared/
│   └── schema.ts             # Drizzle schema & types
└── tailwind.config.ts        # Custom animations & colors
```

## Key Pages

### Homepage
- Full-screen hero with animated gradient background and floating particles
- Badge trio: AI Video Artist / Award-Winning Filmmaker / Electronic Pioneer
- Stats: Best Experimental Film, 6 Dolphin Awards, 40+ Years, Published Author
- Featured sections: Entombed film, Art Soul & AI book
- Electronic music pioneer section (Dreams & Machines, Fairlight CMI)
- Video showcase with featured work
- Awards banner

### Entombed Film Page (/entombed)
- Award-winning 30-minute sci-fi experimental film
- Created entirely with AI video technology
- Festival recognition: NY Arthouse (Winner), Vancouver (Finalist), 5 semi-finals
- Technical details and film synopsis
- Links to FilmFreeway

### Brushstrokes in Time Page (/brushstrokes)
- "The Living Canvas" - animated art series with original music
- Award-winning at Berlin & Florence film festivals
- Featured video: Rousseau's "Transcendent Timeless Space"
- Featured artists: Rousseau, Gauguin, Klimt, Dalí, Namatjira, Drysdale
- Available as installation or educational series
- Live performance format with Dr Baz

### Enter the Machine Page (/enter-the-machine)
- 2004 Interactive Art Installation showcase
- Original Shockwave/Director project recreated for modern web
- Interactive machine interface with activation controls
- Technical specs from the original CD-ROM release
- Media content listing (6 original video files)
- Legacy/historical context as a digital time capsule

### Art, Soul & AI Book Page (/book)
- Exploration of creativity in the age of AI
- Chapter overview
- Author background
- Purchase/inquiry CTAs

## Database Schema
- `projects` - Current musical projects
- `historyItems` - Career history archive (40+ entries) with:
  - `galleryImages` - JSON array of image URLs for photo galleries
  - `youtubeVideos` - JSON array of {id, title} objects for embedded videos
- `awards` - Awards and recognition
- `videos` - Video portfolio with YouTube embeds
- `slides` - Homepage feature carousel
- `contactMessages` - Contact form submissions
- `images` - Managed images with categories

## Image Categories
- `logo` - Logo & Branding
- `headshots` - Professional Headshots
- `electronic` - Electronic music/Fairlight images
- `documentary` - Documentary content
- `solo`, `pete-c`, `rex-carter`, `johnny-cash` - Performance images
- `festivals`, `bands`, `posters`, `albums` - Archive content

## API Endpoints
- `GET /api/projects` - Fetch all projects
- `GET /api/history` - Fetch career history items
- `GET /api/history/:slug` - Fetch single history item by slug (includes galleryImages & youtubeVideos)
- `GET /api/awards` - Fetch awards list
- `GET /api/videos` - Fetch video portfolio
- `GET /api/slides` - Fetch homepage slides
- `POST /api/contact` - Submit contact form
- `GET /api/images` - Fetch images (optional `?category=` filter)
- `POST /api/images` - Add new image
- `DELETE /api/images/:id` - Delete an image

## Running the Project
```bash
npm run dev      # Start development server
npm run db:push  # Push schema to database
```

## Grant Application Optimization
The site emphasizes:
- Award-winning experimental filmmaking (Entombed - Best Experimental Film)
- Published author (Art, Soul and AI)
- Electronic music pioneer (Fairlight CMI, QPAC commissions, 1985)
- PhD Multimedia Design credentials
- 6 N.C.E.I.A. Dolphin Awards
- 40+ years of creative innovation
