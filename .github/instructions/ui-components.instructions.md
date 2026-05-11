---
applyTo: "components/**"
description: "Use when creating or modifying UI components with shadcn/ui, Tailwind CSS v4, or Radix primitives."
---

# UI Component Conventions

- **shadcn/ui**: Add new components with `pnpm shadcn add <component>`. Do NOT hand-write Radix wrappers that shadcn already provides.
- **Style**: `radix-nova` (see `components.json`). Base color: `neutral`. CSS variables enabled.
- **Class merging**: Always use `cn()` from `@/lib/utils` when composing conditional classes.
- **Icons**: Import from `lucide-react`. Do not install other icon packages.
- **Files under `components/ui/`** are shadcn-managed — avoid manual edits unless extending variants.
- Custom project components go in `components/` (outside `ui/`) or feature-scoped folders under `app/`.
