# AI Scaling

Personal brand + lead-generation site for **Nicholas Wood — AI Scaling for Growth**.

Built with [Next.js](https://nextjs.org) (App Router), Tailwind CSS, and
[Supabase](https://supabase.com) for lead capture. Designed to deploy on
[Vercel](https://vercel.com) and connect to **Meta Business Manager** via the
Meta Pixel for ad tracking and conversion attribution.

## Tech stack

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS** for styling
- **Supabase** (Postgres) for storing leads
- **Meta Pixel** for Meta Business Manager / Ads

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Visit http://localhost:3000.

## Environment variables

See [`.env.example`](./.env.example). All of these are configured in the
**Vercel project settings → Environment Variables**:

| Variable | Where to find it | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | Safe to expose |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | **Server only — keep secret** |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Events Manager → Data Sources | Leave blank to disable |
| `NEXT_PUBLIC_SITE_URL` | Your production domain | Used for metadata |

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run [`supabase/schema.sql`](./supabase/schema.sql).
   This creates the `leads` table with Row Level Security enabled.
3. Copy your **Project URL**, **anon key**, and **service_role key** from
   Settings → API into your environment variables.

Leads submitted through the contact form are inserted server-side via the
`/api/leads` route using the `service_role` key, so RLS stays locked down and
the public can't read or write the table directly.

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. In Vercel, **New Project → Import** this repository.
3. Add the environment variables above.
4. Deploy. Vercel auto-detects Next.js — no extra config needed.

## Connecting Meta Business Manager

1. In **Meta Events Manager**, create a Pixel and copy its ID.
2. Set `NEXT_PUBLIC_META_PIXEL_ID` in Vercel and redeploy.
3. The site fires a `PageView` on load and a `Lead` event when the contact
   form is submitted — both show up in Events Manager.
4. Verify your domain in **Business Manager → Brand Safety → Domains** using
   the meta-tag or DNS method Meta provides.

## Project structure

```
src/
  app/
    api/leads/route.ts   # POST endpoint that writes leads to Supabase
    layout.tsx           # Root layout + Meta Pixel + SEO metadata
    page.tsx             # The landing page
    globals.css
  components/
    LeadForm.tsx         # Client-side contact form
    MetaPixel.tsx        # Meta Pixel loader
  lib/
    supabase.ts          # Server-side Supabase client
supabase/
  schema.sql             # Database schema
```
