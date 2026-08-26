# Anas Ibn Belal — Portfolio

A personal portfolio site for **Anas Ibn Belal**, an aspiring software engineer and competitive programmer based in Dhaka, Bangladesh. Built with the Next.js App Router, TypeScript, and Tailwind CSS, with all content driven from typed data files instead of a CMS.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-8gthywkk)

## Tech stack

| Area | Choices |
| --- | --- |
| Framework | Next.js 13.5 (App Router, RSC), React 18 |
| Language | TypeScript 5.2 (`strict`) |
| Styling | Tailwind CSS 3.3, CSS custom properties, `tailwindcss-animate` |
| UI primitives | shadcn/ui on top of Radix UI |
| Animation | Framer Motion |
| Icons | `lucide-react`, `react-icons` |
| Forms | React Hook Form + Zod |
| Fonts | Plus Jakarta Sans + JetBrains Mono via `next/font` |
| Hosting | Netlify (`@netlify/plugin-nextjs`) |

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:3000. No environment variables are required — the site is fully static and has no backend services wired up.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, navbar/footer, skip link
  page.tsx                Home page — composes every section in order
  not-found.tsx           404 page
  globals.css             Tailwind layers + design tokens (HSL CSS variables)
  projects/page.tsx       /projects — full project grid
  projects/[slug]/page.tsx  Project detail, statically generated per slug
components/
  hero/ about/ skills/    One folder per home-page section
  projects/               ProjectCard (+ ProjectsSection), ProjectDetail
  experience/ achievements/ leadership/ contact/
  layout/                 Navbar, Footer, Section wrapper
  shared/Icon.tsx         Maps icon names in data/ to Lucide components
  ui/                     shadcn/ui primitives
data/
  types.ts                Profile, Project, SkillGroup, EducationItem, …
  profile.ts              Name, headline, bio, stats, socials, resume URL
  projects.ts             Projects, skills, tech-stack showcase, helpers
  extras.ts               Education, services, leadership, CP achievements
hooks/                    use-toast
lib/
  constants.ts            siteConfig (nav items, socials), CONTAINER class
  utils.ts                cn() class merger
public/resume/            Résumé PDF served at /resume/...
```

### Home page sections

`app/page.tsx` renders, in order: Hero → About → Services → Skills → Featured Projects → Education → Competitive Programming → Leadership → Contact.

## Editing content

All copy lives in `data/` and is type-checked against `data/types.ts`, so a typo in a field name fails the build rather than silently rendering nothing.

- **Bio, stats, socials, résumé link** — [data/profile.ts](data/profile.ts)
- **Projects and skill groups** — [data/projects.ts](data/projects.ts). Each project needs a unique `slug`; setting `featured: true` promotes it to the home page via the `featuredProjects` filter. Detail routes are generated from the array by `generateStaticParams`, so adding an entry is enough to create its page.
- **Education, services, leadership, CP achievements** — [data/extras.ts](data/extras.ts)
- **Nav items and social links** — [lib/constants.ts](lib/constants.ts)
- **Icons** — data files store icon *names* (e.g. `'Server'`, `'Rocket'`); [components/shared/Icon.tsx](components/shared/Icon.tsx) resolves them to Lucide components.

Project images are remote URLs (ImgBB). `next.config.js` sets `images.unoptimized`, so no remote-pattern allowlist is needed.

## Theming

The palette is a single dark theme defined as HSL custom properties under `:root` in [app/globals.css](app/globals.css) and mapped to Tailwind color names in [tailwind.config.ts](tailwind.config.ts). Accent color is `--primary` (blue, `217 91% 60%`); change that one token to re-brand the site. Tailwind's `darkMode: ['class']` is configured but there is no light theme or theme toggle yet.

## SEO & accessibility

- Title template, description, keywords, Open Graph, and Twitter card metadata are generated from `profile` in [app/layout.tsx](app/layout.tsx); project pages add their own via `generateMetadata`.
- A "Skip to content" link targets `#main`, sections use `scroll-mt` anchors for the in-page nav, and decorative icons are `aria-hidden`.

Before going live, update `metadataBase` in `app/layout.tsx` (currently `https://portfolio.example.com`) to match the real domain — `siteConfig.url` in `lib/constants.ts` has it as `https://anasibnbelal.dev`.

## Deployment

Netlify is configured in [netlify.toml](netlify.toml):

```toml
[build]
command = "npx next build"
publish = ".next"
```

The `@netlify/plugin-nextjs` plugin handles the App Router output. ESLint is skipped during builds (`next.config.js`), so run `npm run lint` and `npm run typecheck` locally.

## Notes

- The contact form validates with Zod but does not send anything — `onSubmit` fakes a delay and shows a success state, and the form itself says so. Wire it to an API route, form service, or mail provider to make it functional.
- `@supabase/supabase-js` is installed but not imported anywhere yet; it can be removed until a backend is actually needed.
