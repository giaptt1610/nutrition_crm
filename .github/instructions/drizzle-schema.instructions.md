---
applyTo: "lib/db/**"
description: "Use when creating or modifying Drizzle ORM database schemas, migrations, or database queries."
---

# Drizzle ORM Conventions

- Schema lives in `lib/db/schema.ts`. Export all tables from this file.
- Use Drizzle's PostgreSQL column builders: `pgTable`, `serial`, `varchar`, `text`, `integer`, `timestamp`, `boolean`, etc.
- Always add `createdAt` and `updatedAt` timestamps to domain tables.
- Use `relations()` from `drizzle-orm` to define relationships between tables.
- Run `pnpm drizzle-kit push` to push schema changes during development.
- Run `pnpm drizzle-kit generate` to create migration SQL files for production.
- Connection uses the `postgres` driver (not `pg`). See `drizzle.config.ts` for reference.
