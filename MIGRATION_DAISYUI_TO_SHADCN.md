# DaisyUI to shadcn/ui Migration

This document outlines the migration from DaisyUI to shadcn/ui for hayao0819.com.

> **Note**: This project uses **Tailwind CSS 4.1.18**, which requires special handling for shadcn/ui setup.

---

## ✅ Migration Completed: 2026-01-26

The migration from DaisyUI to shadcn/ui has been successfully completed.

### Summary of Changes

#### Phase 1: Setup shadcn/ui Foundation

- ✅ Installed dependencies: `tw-animate-css`, `class-variance-authority`, `tailwind-merge`
- ✅ Updated `cn()` function in `src/lib/utils.ts` to include `tailwind-merge`
- ✅ Initialized shadcn/ui with `pnpm dlx shadcn@latest init`
- ✅ Created `components.json` configuration
- ✅ Customized CSS variables for Frame Design (`--radius: 0rem`, custom colors)

#### Phase 2: Color Token Migration (46 files, 316+ occurrences)

| DaisyUI Token | shadcn/ui Token | Notes |
|---------------|-----------------|-------|
| `bg-base-100` | `bg-background` | Background color |
| `text-base-100` | `text-background` | Inverted text |
| `bg-base-content` | `bg-foreground` | Foreground as background |
| `text-base-content` | `text-foreground` | Primary text |
| `border-base-content` | `border-border` / `border-foreground` | Border color |
| `bg-base-200` | `bg-muted` | Secondary background |
| `base-content/XX` | `foreground/XX` | Opacity modifiers |

#### Phase 3: Component Migration

| File | Before | After |
|------|--------|-------|
| `DrawerToggle.tsx` | `btn btn-square btn-ghost` | shadcn `Button` with `variant="ghost" size="icon"` |
| `ShareBtns.tsx` | `*:btn *:tooltip *:tooltip-bottom` | Individual shadcn `Button` + `Tooltip` components |
| `GyaguList.tsx` | `tooltip` with `data-tip` | shadcn `Tooltip` with `TooltipProvider` |
| `playground/new-top/page.tsx` | `btn` | shadcn `Button` with `variant="outline"` |
| `tatebou/Layout.tsx` | `drawer`, `menu`, `navbar` | shadcn `Sheet` + custom navigation |

#### Phase 4: Configuration Cleanup

- ✅ Removed DaisyUI import and config from `tailwind.config.mjs`
- ✅ Removed `@plugin "daisyui"` from `src/style/global.css`
- ✅ Removed `:where(.menu li) { z-index: 0; }` hack
- ✅ Updated `DESIGN.md` color token references

#### Phase 5: Dependency Removal

- ✅ Removed `daisyui` (devDependency)
- ✅ Removed `react-daisyui` (dependency)

### New Dependencies Added

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^3.4.0",
    "tw-animate-css": "^1.4.0",
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-slot": "^1.x",
    "@radix-ui/react-tooltip": "^1.x"
  }
}
```

### New shadcn/ui Components

The following components are now available in `src/components/ui/`:

- `button.tsx` - Button component with variants (default, ghost, outline, etc.)
- `tooltip.tsx` - Tooltip component with TooltipProvider
- `sheet.tsx` - Sheet/Drawer component for mobile navigation

### Color System (CSS Variables)

The color system is now defined in `src/style/global.css` using CSS variables:

```css
:root {
    --radius: 0rem;           /* Frame Design: no border-radius */
    --background: #FCFCFC;    /* was base-100 */
    --foreground: #131313;    /* was base-content */
    --primary: #131313;
    --secondary: #2b2b2b;
    --muted: #F5F5F5;         /* was base-200 */
    --accent: #00838F;
    --border: #131313;
    --ring: #00838F;
}
```

### Build & Lint Status

- ✅ `pnpm run build` - Success
- ✅ `pnpm run lint` - No errors

### Issues Resolved During Migration

1. **markdown.css isolation** ✅ RESOLVED
   - **Problem**: The file used `@reference "tailwindcss"` and had its own Tailwind context, preventing use of shadcn/ui color classes.
   - **Solution**: Integrated `markdown.css` content into `global.css` within the `@layer components` block. Deleted the separate `markdown.css` file and removed imports from `components.tsx` and `server.tsx`.

2. **`*:` selector patterns** ✅ RESOLVED
   - **Problem**: `ShareBtns.tsx` used `*:btn *:tooltip` patterns which don't work with component-based approach.
   - **Solution**: Refactored to wrap each element individually with shadcn `Button` and `Tooltip` components.

---

## Original Migration Plan

## Current State Analysis

### Environment

- **Tailwind CSS**: 4.1.18 (uses `@plugin`, `@config`, `@theme` directives)
- **Node**: 20.10.0
- **Package Manager**: pnpm 10.28.1

### Dependencies to Remove

```json
// package.json
{
  "dependencies": {
    "react-daisyui": "^5.0.5"  // Remove (not actually used in codebase)
  },
  "devDependencies": {
    "daisyui": "^5.5.14"  // Remove
  }
}
```

### Configuration Files to Update

1. **tailwind.config.mjs**
   - Remove DaisyUI plugin import and configuration
   - Replace DaisyUI theme with CSS variables for shadcn/ui

2. **src/style/global.css**
   - Remove `@plugin "daisyui";`
   - Remove `:where(.menu li) { z-index: 0; }` (DaisyUI-specific hack)
   - Add shadcn/ui CSS variables using `@theme` directive

3. **src/lib/utils.ts**
   - Update `cn()` function to include `tailwind-merge`

---

## DaisyUI Usage Inventory

### 1. Semantic Color Tokens (CRITICAL - Used Extensively)

The following DaisyUI color tokens are used throughout the codebase:

| Token | Usage Count | Description |
|-------|-------------|-------------|
| `base-100` | ~50+ | Background color |
| `base-content` | ~100+ | Primary text and borders |
| `base-200` | ~5 | Secondary background |
| `accent` | ~10 | Highlight color |

**Files using color tokens:**

- Almost all component files in `src/components/`
- All page files in `src/app/`
- `src/style/global.css`

### 2. DaisyUI Component Classes

| Component | Class Names | Location |
|-----------|-------------|----------|
| Button | `btn`, `btn-square`, `btn-ghost` | `DrawerToggle.tsx`, `ShareBtns.tsx`, `tatebou/Layout.tsx`, `playground/new-top/page.tsx` |
| Tooltip | `tooltip`, `tooltip-bottom`, `data-tip` | `ShareBtns.tsx`, `GyaguList.tsx` |
| Drawer | `drawer`, `drawer-toggle`, `drawer-content`, `drawer-side`, `drawer-overlay` | `tatebou/Layout.tsx` |
| Menu | `menu`, `menu-horizontal` | `tatebou/Layout.tsx` |
| Navbar | `navbar` | `tatebou/Layout.tsx` |

### 3. DaisyUI Theme Configuration

```js
// tailwind.config.mjs
daisyui: {
    logs: false,
    themes: [
        {
            mono: {
                primary: "#131313",
                secondary: "#2b2b2b",
                accent: "#00838F",
                neutral: "#333333",
                "base-100": "#FCFCFC",
            },
        },
    ],
},
```

---

## Migration Strategy

### Phase 1: Setup shadcn/ui Foundation

#### 1.1 Install Dependencies

```bash
# Install shadcn/ui dependencies
pnpm add tw-animate-css class-variance-authority tailwind-merge

# Note: clsx is already installed
# Note: tailwindcss-animate is deprecated, use tw-animate-css for Tailwind v4
```

#### 1.2 Update cn() Function

Before initializing shadcn/ui, update the existing `cn()` function in `src/lib/utils.ts`:

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ... rest of the file unchanged
```

#### 1.3 Initialize shadcn/ui (Tailwind CSS 4 Compatible)

> **Note**: shadcn/ui latest now fully supports Tailwind CSS 4 with `@theme` directive.

```bash
pnpm dlx shadcn@latest init
```

**Option B: Manual setup (if needed)**

If the init command fails, manually create `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.mjs",
    "css": "src/style/global.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Configuration options:

- Style: Default
- Base color: Neutral (to match current mono theme)
- CSS variables: Yes
- Tailwind CSS config location: `tailwind.config.mjs`
- Components location: `src/components/ui`
- Utils location: `src/lib/utils.ts` (already updated above)

#### 1.4 Create CSS Variables (Tailwind CSS 4 Format)

For Tailwind CSS 4, use the `@theme` directive for custom colors. Update `src/style/global.css`:

```css
@import "tailwindcss";
@config "../../tailwind.config.mjs";
@plugin "@tailwindcss/typography";
/* @plugin "daisyui"; */  /* REMOVE THIS LINE */

@import "./markdown.css";

/* shadcn/ui color variables using @theme directive */
@theme {
    /* Map DaisyUI tokens to shadcn/ui variables */
    --color-background: #FCFCFC;      /* was base-100 */
    --color-foreground: #131313;      /* was base-content */

    --color-card: #FCFCFC;
    --color-card-foreground: #131313;

    --color-popover: #FCFCFC;
    --color-popover-foreground: #131313;

    --color-primary: #131313;         /* was primary */
    --color-primary-foreground: #FCFCFC;

    --color-secondary: #2b2b2b;       /* was secondary */
    --color-secondary-foreground: #FCFCFC;

    --color-muted: #F5F5F5;
    --color-muted-foreground: #666666;

    --color-accent: #00838F;          /* was accent */
    --color-accent-foreground: #FCFCFC;

    --color-destructive: #EF4444;
    --color-destructive-foreground: #FCFCFC;

    --color-border: #131313;          /* Match base-content for Frame Design */
    --color-input: #131313;
    --color-ring: #00838F;            /* accent color */

    --radius: 0rem;                   /* Frame Design uses no border-radius */
}

/* Brand colors (replacement for tailwindcss-brand-colors) */
@theme inline {
    /* ... existing brand colors ... */
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        @apply bg-background text-foreground;
    }
}

@layer components {
    p {
        @apply leading-8;
    }

    .break-phrase {
        word-break: auto-phrase;
    }
}

/* REMOVE THIS - DaisyUI specific hack */
/* :where(.menu li) { z-index: 0; } */
```

**Alternative: HSL format (if needed for compatibility)**

If you need HSL format for better opacity support with Tailwind's color modifiers:

```css
@layer base {
  :root {
    --background: 0 0% 99%;        /* #FCFCFC */
    --foreground: 0 0% 7%;         /* #131313 */
    --card: 0 0% 99%;
    --card-foreground: 0 0% 7%;
    --popover: 0 0% 99%;
    --popover-foreground: 0 0% 7%;
    --primary: 0 0% 7%;
    --primary-foreground: 0 0% 99%;
    --secondary: 0 0% 17%;
    --secondary-foreground: 0 0% 99%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 40%;
    --accent: 185 100% 28%;        /* #00838F - corrected hue */
    --accent-foreground: 0 0% 99%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 99%;
    --border: 0 0% 7%;
    --input: 0 0% 7%;
    --ring: 185 100% 28%;
    --radius: 0rem;
  }
}
```

> **Note**: The accent color HSL hue was corrected from 187 to 185 to match #00838F more accurately.

#### 1.6 Animation Library

shadcn/ui now uses `tw-animate-css` instead of the deprecated `tailwindcss-animate`:

```css
/* Add to global.css */
@import "tw-animate-css";
```

Or configure via plugin:

```css
@plugin "tw-animate-css";
```

#### 1.5 Create Color Mapping Utility

Create a utility to help with migration (temporary):

```ts
// src/lib/color-migration.ts
// This file documents the color mapping and can be removed after migration

export const COLOR_MAPPING = {
  // DaisyUI -> Tailwind CSS variable
  "base-100": "background",
  "base-content": "foreground",
  "base-200": "muted",
  "accent": "accent",
  "primary": "primary",
  "secondary": "secondary",
  "neutral": "muted",
} as const;

// Usage: Replace `bg-base-100` with `bg-background`
// Usage: Replace `text-base-content` with `text-foreground`
// Usage: Replace `border-base-content` with `border-border` or `border-foreground`
```

---

### Phase 2: Color Token Migration

#### 2.1 Search and Replace Patterns

Execute these replacements across all files:

```
bg-base-100      -> bg-background
text-base-100    -> text-background
border-base-100  -> border-background

bg-base-content      -> bg-foreground
text-base-content    -> text-foreground
border-base-content  -> border-border (or border-foreground for thick borders)

bg-base-200      -> bg-muted
text-base-200    -> text-muted

text-accent      -> text-accent
bg-accent        -> bg-accent
border-accent    -> border-accent
```

**Important:** The opacity modifiers (e.g., `base-content/70`) should become `foreground/70`.

#### 2.2 Files Requiring Manual Review

After bulk replacement, manually review these files for edge cases:

1. `src/components/elements/Markdown/components.tsx`
   - Complex color usage with opacity modifiers

2. `src/components/layouts/Drawer/DrawerContent.tsx`
   - Inverted color sections

3. `src/components/layouts/Header.tsx`
   - Logo section with inverted colors

4. `DESIGN.md`
   - Update documentation to reflect new token names

---

### Phase 3: Component Migration

#### 3.1 Button Component

**Current DaisyUI usage:**

```tsx
// DrawerToggle.tsx
<span className="btn btn-square btn-ghost text-2xl" onClick={toggle}>

// ShareBtns.tsx
<div className="*:btn *:tooltip *:tooltip-bottom ...">

// tatebou/Layout.tsx
<label className="btn btn-square btn-ghost">
```

**Migration to shadcn/ui:**

1. Install Button component:

```bash
pnpm dlx shadcn@latest add button
```

1. Create custom variants for Frame Design:

```tsx
// src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        ghost: "hover:bg-foreground/5",
        outline: "border-2 border-border hover:bg-foreground hover:text-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

1. Replace usages:

```tsx
// Before
<span className="btn btn-square btn-ghost text-2xl">

// After
<Button variant="ghost" size="icon" className="text-2xl">
```

#### 3.2 Tooltip Component

**Current DaisyUI usage:**

```tsx
// ShareBtns.tsx
<div className="*:tooltip *:tooltip-bottom" data-tip="Twitterで共有">

// GyaguList.tsx
<div className="tooltip" data-tip="提供: DaiChi">
```

**Migration to shadcn/ui:**

1. Install Tooltip component:

```bash
pnpm dlx shadcn@latest add tooltip
```

1. Replace usages:

```tsx
// Before
<Link data-tip="Twitterで共有" className="tooltip tooltip-bottom">

// After
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Link>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      Twitterで共有
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### 3.2.1 ShareBtns.tsx Complete Migration

This file uses the `*:btn *:tooltip` pattern which requires complete restructuring.

**Current code:**

```tsx
<div className="flex flex-wrap justify-center *:btn *:tooltip *:tooltip-bottom *:m-2 *:flex *:justify-center *:p-3 *:!text-base-100 *:shadow-lg">
    <ShareTwitter url={url} text={text} />
    <ShareFacebook url={url} />
    {/* ... */}
</div>
```

**Migrated code:**

```tsx
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ShareBtns({ url, text }: ShareProps) {
    return (
        <div className="flex w-full flex-wrap items-center justify-center">
            <TooltipProvider>
                <div className="flex flex-wrap justify-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild className="bg-twitter text-background shadow-lg hover:bg-twitter/90">
                                <Link href={generateTwitterShareUrl(url, text)}>
                                    <FaTwitter className="mr-2" />
                                    Tweet
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Twitterで共有</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild className="bg-facebook text-background shadow-lg hover:bg-facebook/90">
                                <Link href={generateFaceBookShareUrl(url)}>
                                    <FaFacebook className="mr-2" />
                                    Share
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Facebookで共有</TooltipContent>
                    </Tooltip>

                    {/* Similar pattern for Line, LinkedIn */}
                </div>
            </TooltipProvider>
        </div>
    );
}
```

**Key changes:**

- Remove `*:` selector patterns (not compatible with component-based approach)
- Wrap each share button in `Tooltip` + `Button` components
- Use `asChild` prop to pass styling to child Link
- Replace `!text-base-100` with `text-background`

#### 3.3 Drawer Component (for tatebou)

The main site already uses a custom Drawer with Framer Motion. Only `tatebou/Layout.tsx` uses DaisyUI's drawer.

**Migration options:**

Option A: Use shadcn/ui Sheet component

```bash
pnpm dlx shadcn@latest add sheet
```

Option B: Refactor to use the existing custom Drawer from `src/components/layouts/Drawer/`

**Recommendation:** Option A for tatebou (simpler), keep existing custom Drawer for main site.

#### 3.4 Menu Component (for tatebou)

**Current DaisyUI usage:**

```tsx
// tatebou/Layout.tsx
<ul className="menu h-full w-80 bg-base-200 p-4">
<ul className="menu menu-horizontal">
```

**Migration:**
Replace with custom styled navigation using Tailwind classes, similar to the main site's `CommonMenu.tsx`.

#### 3.5 Navbar Component (for tatebou)

**Current DaisyUI usage:**

```tsx
<div className="navbar w-full bg-base-200">
```

**Migration:**
Replace with a simple flex container:

```tsx
<nav className="flex w-full items-center bg-muted px-4 py-2">
```

---

### Phase 4: Configuration Cleanup

#### 4.1 Update tailwind.config.mjs

```js
// Remove these imports and configurations
import daisyUI from "daisyui";  // DELETE

export default {
    // ... other config

    // DELETE this entire block
    daisyui: {
        logs: false,
        themes: [...],
    },

    // UPDATE plugins array - remove daisyUI
    plugins: [
        // daisyUI,  // DELETE
    ],
};
```

#### 4.2 Update src/style/global.css

```css
@import "tailwindcss";
@config "../../tailwind.config.mjs";
@plugin "@tailwindcss/typography";
/* @plugin "daisyui"; */  /* DELETE */

@import "./markdown.css";

/* shadcn/ui theme colors - see Phase 1.4 for full configuration */
@theme {
    --color-background: #FCFCFC;
    --color-foreground: #131313;
    /* ... other colors from Phase 1.4 ... */
}

/* Brand colors */
@theme inline {
    /* ... existing brand colors ... */
}

/* Add shadcn/ui base styles */
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
    p {
        @apply leading-8;
    }

    .break-phrase {
        word-break: auto-phrase;
    }
}

/* DELETE THIS - DaisyUI specific hack no longer needed */
/* :where(.menu li) { z-index: 0; } */
```

#### 4.3 Remove DaisyUI-specific CSS Hacks

Delete the following from `src/style/global.css`:

```css
/* DELETE THIS ENTIRE BLOCK */
:where(.menu li) {
    z-index: 0;
}
```

This was a workaround for DaisyUI's menu component z-index issues.

#### 4.3 Update DESIGN.md

Update all color token references in the design documentation:

- `base-100` -> `background`
- `base-content` -> `foreground`
- `base-200` -> `muted`
- `accent` -> `accent`

---

### Phase 5: Remove Dependencies

```bash
pnpm remove daisyui react-daisyui
```

---

## Migration Checklist

### Pre-Migration

- [ ] Backup current codebase (git commit)
- [ ] Create migration branch
- [ ] Verify Node.js 20+ and pnpm 10+ are installed

### Phase 1: Setup

- [ ] Install dependencies: `pnpm add tw-animate-css class-variance-authority tailwind-merge`
- [ ] Update `cn()` function in `src/lib/utils.ts` to include `tailwind-merge`
- [ ] Run `pnpm dlx shadcn@latest init`
- [ ] Add CSS variables using `@theme` directive in `global.css`
- [ ] Verify build passes: `pnpm run build`

### Phase 2: Colors (316 occurrences, 48 files)

- [ ] Replace `bg-base-100` with `bg-background`
- [ ] Replace `text-base-100` with `text-background`
- [ ] Replace `bg-base-content` with `bg-foreground`
- [ ] Replace `text-base-content` with `text-foreground`
- [ ] Replace `border-base-content` with `border-border` or `border-foreground`
- [ ] Replace `base-content/XX` opacity patterns with `foreground/XX`
- [ ] Replace `bg-base-200` with `bg-muted`
- [ ] Verify color consistency
- [ ] Test visual appearance on all major pages

### Phase 3: Components

- [ ] Install Button: `pnpm dlx shadcn@latest add button`
- [ ] Migrate `DrawerToggle.tsx` (btn btn-square btn-ghost)
- [ ] Install Tooltip: `pnpm dlx shadcn@latest add tooltip`
- [ ] Migrate `ShareBtns.tsx` (complete restructure - remove `*:` selectors)
- [ ] Migrate `GyaguList.tsx` (tooltip)
- [ ] Migrate `playground/new-top/page.tsx` (btn)
- [ ] Install Sheet: `pnpm dlx shadcn@latest add sheet`
- [ ] Migrate `tatebou/Layout.tsx` (drawer, menu, navbar)

### Phase 4: Cleanup

- [ ] Remove DaisyUI import from `tailwind.config.mjs`
- [ ] Remove `daisyui: { ... }` config from `tailwind.config.mjs`
- [ ] Remove `@plugin "daisyui"` from `global.css`
- [ ] Remove `:where(.menu li) { z-index: 0; }` hack from `global.css`
- [ ] Update DESIGN.md documentation (color token names)

### Phase 5: Finalize

- [ ] Remove packages: `pnpm remove daisyui react-daisyui`
- [ ] Run lint: `pnpm run lint`
- [ ] Run build: `pnpm run build`
- [ ] Test all pages visually:
  - [ ] Home page
  - [ ] Blog list and post pages
  - [ ] Portfolio page
  - [ ] Social page
  - [ ] tatebou pages
- [ ] Test mobile responsive layout
- [ ] Test drawer open/close
- [ ] Test tooltips display
- [ ] Deploy to staging (if available)

---

## File-by-File Migration Reference

### High Priority (DaisyUI Components)

| File | DaisyUI Usage | Migration Task |
|------|---------------|----------------|
| `src/components/layouts/Drawer/DrawerToggle.tsx` | `btn btn-square btn-ghost` | Use shadcn Button |
| `src/components/elements/ShareBtns.tsx` | `btn`, `tooltip` | Use shadcn Button + Tooltip |
| `src/components/tatebou/Layout.tsx` | `drawer`, `menu`, `navbar` | Full refactor with shadcn Sheet |
| `src/features/GyaguList.tsx` | `tooltip` | Use shadcn Tooltip |
| `src/app/(hayao)/playground/new-top/page.tsx` | `btn` | Use shadcn Button |

### Medium Priority (Color Tokens Only)

All files in these directories need color token replacement:

- `src/components/elements/`
- `src/components/layouts/`
- `src/app/(hayao)/`

### Low Priority (Documentation)

- `DESIGN.md` - Update color token documentation

---

## Potential Issues and Solutions

### 1. Typography Plugin Conflict

**Issue:** Both DaisyUI and @tailwindcss/typography provide prose styles.
**Solution:** Already using @tailwindcss/typography, no conflict expected after removing DaisyUI.

### 2. CSS Variable Format

**Issue:** shadcn/ui uses `hsl()` format for colors, but Tailwind v4 prefers OKLCH.
**Solution:** shadcn/ui latest automatically converts HSL to OKLCH. You can define colors in either format:

```css
/* Option 1: Direct hex/rgb in @theme */
@theme {
    --color-background: #FCFCFC;
}

/* Option 2: HSL in @layer base (legacy support) */
@layer base {
  :root {
    --background: 0 0% 99%;
  }
}
```

### 3. Dark Mode

**Issue:** Current site doesn't have dark mode, but shadcn/ui supports it.
**Solution:** Define only `:root` variables initially. Add `.dark` class later if needed.

### 4. Tailwind CSS 4 Compatibility

**Issue:** Tailwind CSS 4 requires different configuration syntax.
**Solution:** ✅ shadcn/ui latest (as of 2025) fully supports Tailwind CSS 4:

- CLI can initialize projects with Tailwind v4
- Full support for `@theme` directive
- All components updated for Tailwind v4 and React 19

### 5. Animation Library Deprecation

**Issue:** `tailwindcss-animate` is deprecated in Tailwind v4.
**Solution:** Use `tw-animate-css` instead:

```bash
pnpm add tw-animate-css
```

### 6. `*:` Selector Patterns

**Issue:** Files like `ShareBtns.tsx` use `*:btn *:tooltip` patterns that don't work with component-based approach.
**Solution:** Refactor to wrap each element individually with shadcn components. See Phase 3.2.1 for detailed migration.

---

## Testing Strategy

1. **Visual Testing:**
   - Compare screenshots before/after migration
   - Check all major pages: Home, Blog, Portfolio, Social

2. **Functional Testing:**
   - Drawer open/close
   - Tooltips display
   - Button interactions
   - Mobile responsive layout

3. **Build Testing:**
   - `pnpm run lint` passes
   - `pnpm run build` succeeds
   - No console errors

---

## Estimated Effort by Component

| Component | Files Affected | Complexity | Notes |
|-----------|---------------|------------|-------|
| Color tokens | 48 files (316 occurrences) | Low | Bulk find/replace |
| cn() function | 1 file | Low | Add tailwind-merge |
| Button | 5 files | Medium | Standard shadcn migration |
| Tooltip | 2 files | Medium | Standard shadcn migration |
| ShareBtns.tsx | 1 file | **High** | Complete restructure needed |
| tatebou Drawer | 1 file | High | Use Sheet component |
| tatebou Menu | 1 file | Medium | Replace with flex nav |
| Documentation | 2 files | Low | Update color names |

---

## Reference Commands

```bash
# Search for DaisyUI usages
grep -r "base-100\|base-content\|base-200" src/
grep -r "btn\|tooltip\|drawer\|menu\|navbar" src/ --include="*.tsx"

# Search for specific DaisyUI classes
grep -rn "className.*btn" src/ --include="*.tsx"
grep -rn "data-tip" src/ --include="*.tsx"

# Count occurrences
grep -r "base-content" src/ | wc -l
grep -r "base-100" src/ | wc -l
```

---

## Notes for Future Maintainer

1. **Frame Design Principle:** This site uses "Frame Design" (borders as primary design elements). Ensure any new components follow this pattern with bold borders (`border-4`) and no border-radius.

2. **Custom Drawer:** The main site uses a custom Framer Motion-based Drawer (`src/components/layouts/Drawer/`). Only `tatebou` section uses DaisyUI drawer.

3. **Utility Function:** `src/lib/utils.ts` already has `cn()` function using `clsx`. Add `tailwind-merge` for full shadcn/ui compatibility (handles conflicting Tailwind classes).

4. **Typography:** The project uses `@tailwindcss/typography` for prose styles. Blog content styling is in `src/components/elements/Markdown/components.tsx`.
