# Evergreen Academy — School Website with CMS Dashboard

A world-class, premium school website with a full WordPress-style CMS dashboard. Built with React + Vite + Tailwind CSS. 100% static — works on Vercel, Netlify, or any static host.

---

## Tech Stack

- **React 19** — UI framework
- **Vite 7** — Build tool
- **Tailwind CSS 4** — Styling
- **Framer Motion** — Animations
- **Wouter** — Client-side routing
- **Zustand** — State management
- **localStorage** — Data persistence (no backend required)
- **shadcn/ui** — UI components

---

## Features

### Public Website (8 Pages)
- **Home** — Animated hero, stats bar, news highlights, upcoming events
- **About** — School history, mission, vision, leadership team
- **Admissions** — Requirements, process steps, fees, deadline
- **Notices** — Filterable notice board with pinned notices
- **News** — Featured news articles with image gallery
- **Events** — Monthly calendar view
- **Gallery** — Photo grid with category filters
- **Contact** — Contact form, address, map

### CMS Admin Dashboard (`/admin`)
Login with: **admin** / **school2024**

| Section | Features |
|---|---|
| Overview | Live stats, pinned notices, upcoming events |
| Home Page | Hero title, subtitle, CTA, background image, statistics |
| About Page | History, mission, vision, history image |
| Admissions | Intro, requirements list, process steps, fees, deadline |
| Contact Page | Address, phone, email, office hours |
| Notices | Full CRUD — add, edit, delete, reorder, pin/unpin |
| News | Full CRUD — add, edit, delete, set featured article |
| Events | Full CRUD — date, time, location, description |
| Gallery | Grid CRUD — add, edit, delete images by URL |
| Leadership Team | Add, edit, delete team members with photos |
| Media Manager | Upload images from disk or by URL, copy URL |
| Design & Theme | Colour presets, custom colour pickers, font selector, logo |
| Site Settings | School name/tagline, export JSON backup, import JSON backup |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run serve
```

After `npm run dev`, open: http://localhost:3000

---

## Project Structure

```
evergreen-academy/
├── public/                  # Static assets
│   ├── favicon.svg
│   └── opengraph.jpg
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (Button, Card, Input, etc.)
│   │   ├── DynamicStyles.tsx  # Applies CMS design settings as CSS variables
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── hooks/
│   │   ├── useAdmin.ts      # Admin auth (localStorage)
│   │   ├── useCmsData.ts    # Full CMS data model + localStorage persistence
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx  # Full CMS dashboard
│   │   │   └── AdminLogin.tsx
│   │   ├── About.tsx
│   │   ├── Admission.tsx
│   │   ├── Contact.tsx
│   │   ├── Events.tsx
│   │   ├── Gallery.tsx
│   │   ├── Home.tsx
│   │   ├── News.tsx
│   │   ├── Notices.tsx
│   │   └── not-found.tsx
│   ├── App.tsx              # Router setup
│   ├── index.css            # Global styles + Google Fonts
│   └── main.tsx             # Entry point
├── index.html               # HTML entry point
├── package.json             # Dependencies (explicit versions, npm compatible)
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config (Vercel-optimized)
├── vercel.json              # Vercel deployment config
└── README.md
```

---

## Data Storage

All CMS data is stored in the browser's `localStorage`:
- Key: `school_cms_data` — all website content
- Key: `school_auth` — admin session

**Export/Import backup:** Go to Admin Dashboard → Site Settings → Export JSON Backup to download a `.json` file. Use Import to restore from backup.

---

## Customisation

### Change Admin Password
Edit `src/hooks/useAdmin.ts`:
```ts
if (username === 'admin' && pass === 'school2024') {
  // Change 'school2024' to your password
```

### Change School Name
Go to Admin → Site Settings → School Information

### Change Colours
Go to Admin → Design & Theme → choose a preset or set custom hex colours

---

## Vercel Deployment

See `vercel-deploy.txt` for step-by-step instructions.

Short version:
1. Push to GitHub
2. Import repo in Vercel
3. Vercel auto-detects `vercel.json` settings
4. Deploy — done!

No environment variables needed. No backend. Pure static.
