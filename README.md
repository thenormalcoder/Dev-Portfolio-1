# Jatin Bhojwani — Portfolio Website

A "Warm Terminal" themed portfolio built with Vite + React 19 + TypeScript, Tailwind CSS v4, and Motion.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## How to edit your content

All text, links, and lists live in **`src/data/portfolio.ts`**. Edit that file to update anything on the page. No component code needs to change.

- **Profile info** (name, tagline, email, roles, tech chips): edit the `profile` object.
- **Hero stats**: edit the `heroStats` array.
- **Work/education timeline**: edit the `journey` array.
- **Projects**: edit the `projects` array.
- **Certifications, achievements, coding profiles**: edit the respective arrays.

### Placeholder values

Any value starting with `ADD_` is a placeholder. The site automatically hides the related field, link, or button until you replace it with a real value. For example, if `socials.github` is `"ADD_GITHUB_URL"`, the GitHub link won't appear. Replace it with your real URL and it shows up.

### Replacing the resume

Put your resume PDF at `public/resume/Jatin_Bhojwani_Resume.pdf`. The "Download resume" button links to this file.

### Replacing the photo

Put your photo at `public/images/profile.webp` (WebP, under 200KB recommended), then bump the `?v=` number on `profile.photo` so browsers fetch the new file. If the file is missing, a stock AI image is shown instead.

### Replacing project images

Project covers live in `public/images/projects/` (currently SVG diagrams). To use real screenshots, drop a WebP there and update the project's `image` path in `src/data/portfolio.ts`.

### Gallery and certificate images

- **Contact photo stack:** files in `public/images/gallery/`, listed in the `gallery` array.
- **Floating certificates:** files in `public/images/certificates/`, listed in the `certificateImages` array.

Keep each image WebP and under ~200KB.

## Deployment

### Vercel

1. Push your repo to GitHub.
2. Import the project at [vercel.com](https://vercel.com).
3. Build command: `npm run build` — Output directory: `dist`.
4. Deploy. The included `vercel.json` handles SPA routing fallback.

### Netlify

1. Push your repo to GitHub.
2. Connect the repo at [netlify.com](https://netlify.com).
3. Build command: `npm run build` — Publish directory: `dist`.
4. Deploy. The included `netlify.toml` handles SPA routing fallback.

## Tech stack

- **Vite** — build tool and dev server
- **React 19 + TypeScript** — UI framework (strict mode, no `any`)
- **Tailwind CSS v4** — styling via `@tailwindcss/vite` (CSS-first config)
- **Motion** — animations (import from `motion/react`)
- **Lucide React** — UI icons
- **React Icons** — brand icons (GitHub, LinkedIn, CodeChef, Codeforces)

## Project structure

```
src/
  data/portfolio.ts          ← ALL content lives here
  theme/ThemeProvider.tsx    ← dark/light theme context
  hooks/                     ← useReducedMotion, usePageVisible, useActiveSection
  components/
    background/              ← GridBackground, CodeRain
    layout/                  ← Navbar, Footer, Loader, CustomCursor, SectionHeading
    sections/                ← Hero, Journey, Projects, Credentials
    ui/                      ← Chip, Button, CodeCard, StatCard, IconLink, PhotoStack
  App.tsx, main.tsx, index.css
```
