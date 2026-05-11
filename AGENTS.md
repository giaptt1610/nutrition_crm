<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Nutrition CRM

A CRM for nutrition professionals. Early-stage — schema and features are being scaffolded.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (radix-nova style) |
| Forms | React Hook Form + Zod v4 validation |
| ORM | Drizzle ORM + PostgreSQL (`postgres` driver) |
| Package manager | pnpm (monorepo workspace) |

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint (core-web-vitals + TypeScript)
pnpm drizzle-kit push   # Push schema to DB
pnpm drizzle-kit generate  # Generate migrations
```

## Project Structure

```
app/              # Next.js App Router — pages, layouts, API routes
components/ui/    # shadcn/ui primitives (do NOT edit by hand — use `pnpm shadcn add`)
lib/              # Shared utilities (cn helper, etc.)
lib/db/schema.ts  # Drizzle ORM schema (referenced by drizzle.config.ts)
drizzle/          # Generated migrations
```

Path alias: `@/*` → project root.

## Conventions

- **UI components**: Add via `pnpm shadcn add <component>`. Never hand-write components that shadcn provides.
- **Styling**: Use Tailwind utility classes + CSS variables defined in `app/globals.css`. Use `cn()` from `@/lib/utils` to merge classes.
- **Forms**: Use React Hook Form with Zod schemas via `@hookform/resolvers`.
- **Database**: Define tables in `lib/db/schema.ts` using Drizzle ORM's PostgreSQL column builders.
- **Icons**: Use `lucide-react`.
- **Server components by default**: Only add `"use client"` when the component needs interactivity.

## Environment Variables

Copy `.env.local.example` → `.env.local` and set `DATABASE_URL`.
