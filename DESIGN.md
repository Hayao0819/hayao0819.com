# Design System Documentation

This document describes the design system for hayao0819.com, based on the "Frame Design" (枠のデザイン) methodology.

## Design Philosophy

### Frame Design (枠のデザイン)

Frame Design is a graphic design methodology that treats borders and frames as primary design elements rather than mere decorations. This approach draws inspiration from everyday information displays such as timetables, seating charts, calendars, and periodic tables—formats where the frame itself serves as an essential tool for organizing and communicating information.

Unlike decorative border treatments, Frame Design uses borders functionally to:
- Establish clear visual hierarchy
- Group related information
- Guide the reader's eye through content
- Create rhythm and structure in layouts

Key principles:
- **Grid-based layout**: Information is organized within horizontal and vertical frames
- **Clear boundaries**: Bold borders define sections and create visual hierarchy
- **Systematic organization**: Structure emerges from the same principles used in timetables and charts
- **Functional beauty**: Aesthetic value comes from clarity and structured information display, not ornamentation

## Core Design Patterns

### 1. Border System

Use **4px solid borders** (`border-4`) as the primary visual element:

```tsx
// Outer frame
<div className="border-4 border-foreground">

// Section dividers
<div className="border-b-4 border-foreground">

// Vertical dividers
<div className="border-r-4 border-foreground">
```

### 2. Grid Layout with Vertical Label

A distinctive pattern: vertical text label on the left side with content on the right:

```tsx
<div className="grid grid-cols-[auto_1fr]">
    {/* Vertical Label */}
    <div className="border-r-4 border-foreground p-3 text-sm font-bold [writing-mode:vertical-lr]">
        Label
    </div>
    {/* Content */}
    <div className="p-4">
        {/* ... */}
    </div>
</div>
```

### 3. Section Organization

Sections are stacked vertically with bold bottom borders:

```tsx
<div className="flex flex-col">
    <div className="border-b-4 border-foreground p-4">
        Section 1
    </div>
    <div className="border-b-4 border-foreground p-4">
        Section 2
    </div>
    <div className="p-4">
        Last Section (no bottom border)
    </div>
</div>
```

### 4. Interactive Elements

Buttons and links use border-based hover states:

```tsx
<Link
    className="border border-foreground px-2 py-0.5 text-xs hover:bg-foreground hover:text-background"
>
    Button Text
</Link>
```

## Reusable Components

The following reusable components have been extracted to reduce code duplication and ensure consistency.

### VerticalLabel

A vertical text label with optional inverted colors. Used for page titles and section labels.

**File:** `src/components/elements/VerticalLabel.tsx`

```tsx
interface VerticalLabelProps {
    children: ReactNode;
    className?: string;
    inverted?: boolean;  // Default: true (white text on black background)
    as?: "h1" | "h2" | "div" | "span";
}

// Usage
<VerticalLabel as="h1" className="text-2xl font-black">
    Page Title
</VerticalLabel>
```

### Section

A container for content sections with optional title, description, and bottom border.

**File:** `src/components/elements/Section.tsx`

```tsx
interface SectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
    isLast?: boolean;     // If true, no bottom border
    className?: string;
    padding?: "sm" | "md" | "lg";  // Default: "lg"
}

// Usage
<Section title="Skills" description="得意な技術スタック" isLast>
    {/* Content */}
</Section>
```

### NavItem

A navigation item with icon, title, and description. Used on home page.

**File:** `src/components/elements/NavItem.tsx`

```tsx
interface NavItemProps {
    href: string;
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

// Usage
<NavItem
    href="/blog/1"
    icon={<FaBlog />}
    title="Blog"
    description="技術記事など"
    className="border-t-4 border-foreground"
/>
```

### IconButton

A square icon button with hover effect. Used for social media links.

**File:** `src/components/elements/IconButton.tsx`

```tsx
interface IconButtonProps {
    href: string;
    icon: ReactNode;
    label?: string;
    size?: "sm" | "md" | "lg";  // Default: "md"
    className?: string;
}

// Usage
<IconButton href="https://github.com/Hayao0819" icon={<FaGithub />} label="GitHub" />
```

### SkillItem

A skill display item with icon and name. Supports main/sub level distinction.

**File:** `src/components/elements/SkillItem.tsx`

```tsx
interface SkillItemProps {
    icon: ReactNode;
    name: string;
    level?: "main" | "sub";  // "main" has solid border and light background
    className?: string;
}

// Usage
<SkillItem icon={<SiNextdotjs />} name="Next.js" level="main" />
```

### PortfolioItem

A portfolio item showing language/technology with associated projects.

**File:** `src/components/elements/PortfolioItem.tsx`

```tsx
interface PortfolioItemProps {
    icon: ReactNode;
    name: string;
    projects: string[];
    className?: string;
}

// Usage
<PortfolioItem icon={<SiGo />} name="Golang" projects={["lico", "ayaka", "stargazy"]} />
```

### SocialLink

A social media link with icon, name, and optional handle.

**File:** `src/components/elements/SocialLink.tsx`

```tsx
interface SocialLinkProps {
    href: string;
    icon: ReactNode;
    name: string;
    handle?: string;
    className?: string;
}

// Usage
<SocialLink
    href="https://twitter.com/Hayao0819"
    icon={<FaTwitter />}
    name="Twitter"
    handle="@Hayao0819"
    className="border-b-4 border-foreground"
/>
```

## Component Patterns

### Page Container

```tsx
<div className="border-4 border-foreground">
    <div className="grid grid-cols-[auto_1fr]">
        <h1 className="border-r-4 border-foreground p-4 text-3xl font-bold [writing-mode:vertical-lr]">
            Page Title
        </h1>
        <div className="flex flex-col">
            {/* Content sections */}
        </div>
    </div>
</div>
```

### Blog Post Layout

```tsx
<div className="flex flex-col border-4 border-foreground">
    {/* Header with vertical label */}
    <div className="grid grid-cols-[auto_1fr] border-b-4 border-foreground">
        <div className="border-r-4 border-foreground p-3 [writing-mode:vertical-lr]">
            Post
        </div>
        <div className="flex flex-col">
            <div className="border-b-4 border-foreground p-4">
                {/* Title */}
            </div>
            <div className="p-3">
                {/* Date & Categories */}
            </div>
        </div>
    </div>

    {/* Table of Contents */}
    <div className="border-b-4 border-foreground">
        {/* TOC content */}
    </div>

    {/* Main Content */}
    <div className="grow p-4">
        {/* Article */}
    </div>

    {/* Footer */}
    <div className="border-t-4 border-foreground">
        {/* Share, Navigation */}
    </div>
</div>
```

### Table of Contents

The TOC uses numbered items with a hierarchical structure and left border hover effect:

```tsx
<div className="grid grid-cols-[auto_1fr] border-b-4 border-foreground">
    <div className="border-r-4 border-foreground p-3 text-xs font-bold [writing-mode:vertical-lr]">
        Contents
    </div>
    <div className="p-4">
        <ul className="list-none space-y-2">
            <li className="leading-relaxed">
                <a className="group flex items-start gap-3 border-l-2 border-transparent py-1 pl-3 transition-colors hover:border-accent hover:text-accent">
                    <span className="shrink-0 font-mono text-sm text-foreground/40 transition-colors group-hover:text-accent">
                        01
                    </span>
                    <span className="group-hover:underline">Section Title</span>
                </a>
                {/* Nested items use left border with bullet points */}
                <ul className="mt-2 space-y-1 border-l-2 border-foreground/20 pl-4">
                    <li>
                        <a className="group flex items-start gap-3 py-0.5 text-sm transition-colors hover:text-accent">
                            <span className="shrink-0 text-xs text-foreground/30 transition-colors group-hover:text-accent">
                                •
                            </span>
                            <span className="group-hover:underline">Subsection</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
```

- **Top-level items**: Zero-padded numbers (01, 02, ...) with left border hover effect
- **Nested items**: Bullet points (•) with subtle left border
- **Hover effect**: Left border turns accent color, text underlines

### Sidebar

```tsx
<div className="border-4 border-foreground">
    <div className="grid grid-cols-[auto_1fr]">
        <div className="row-span-4 border-r-4 border-foreground p-2 [writing-mode:vertical-lr]">
            Menu
        </div>
        <div className="flex flex-col">
            <div className="border-b-4 border-foreground p-3">
                Section 1
            </div>
            <div className="border-b-4 border-foreground p-3">
                Section 2
            </div>
            <div className="p-3">
                Section 3
            </div>
        </div>
    </div>
</div>
```

## Color System

The design uses shadcn/ui semantic color tokens:

| Token | Usage |
|-------|-------|
| `foreground` | Primary text and borders |
| `background` | Background color |
| `accent` | Highlights and interactive states |

## Typography

- **Headings**: Bold, centered for page titles
- **Labels**: Small, bold, often in vertical orientation
- **Body**: Standard prose with relaxed line-height
- **Monospace**: Used for numbering (e.g., TOC indices)

## Spacing

- **Padding**: `p-3` or `p-4` for content areas
- **Gaps**: `gap-1` or `gap-2` for flex/grid layouts
- **Margins**: Minimal; borders provide visual separation

## Responsive Considerations

- Vertical labels may be hidden on small screens
- Grid layouts collapse to single column on mobile
- Sidebar hidden on mobile (`hidden md:block`)

## Implementation Checklist

When creating new components, ensure:

- [ ] Outer container has `border-4 border-foreground`
- [ ] Sections use `border-b-4 border-foreground` (except last)
- [ ] Vertical labels use `[writing-mode:vertical-lr]`
- [ ] Interactive elements have border-based hover states
- [ ] Grid layout uses `grid-cols-[auto_1fr]` pattern
- [ ] Colors use semantic tokens (`foreground`, `accent`)

## Markdown Components

Markdown content within blog posts should follow the same design principles.

### Blockquote

Blockquotes use the frame design with a vertical label:

```tsx
<blockquote className="border-4 border-foreground">
    <div className="grid grid-cols-[auto_1fr]">
        <div className="border-r-4 border-foreground bg-foreground p-2 text-xs font-bold text-background [writing-mode:vertical-lr]">
            Quote
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
</blockquote>
```

### Lists (ul/ol)

Lists use left border to indicate hierarchy:

```tsx
// Unordered list
<ul className="my-2 border-l-4 border-foreground pl-4">
    <li className="py-1">{children}</li>
</ul>

// Ordered list with numbers
<ol className="my-2 border-l-4 border-foreground pl-4">
    <li className="flex gap-2 py-1">
        <span className="font-mono text-xs text-foreground/50">01</span>
        <span>{children}</span>
    </li>
</ol>
```

### Inline Code

Inline code uses border styling consistent with the design system. Code blocks (with className from syntax highlighter) are rendered differently from inline code:

```tsx
code: ({ children, className }) => {
    // Code blocks (with className from shiki) - render as-is
    if (className) {
        return <code className={className}>{children}</code>;
    }
    // Inline code style
    return (
        <code className="mx-0.5 border border-foreground/30 bg-foreground/5 px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
            {children}
        </code>
    );
}
```

- **Border**: `border border-foreground/30` for subtle frame
- **Background**: `bg-foreground/5` for slight distinction
- **Padding**: `px-1.5 py-0.5` for comfortable spacing
- **Font**: `font-mono text-[0.9em]` slightly smaller monospace
- **Color**: `text-accent` for visibility

### Tables

Tables use the grid-based frame design:

```tsx
<div className="my-4 border-4 border-foreground">
    <table className="w-full">
        <thead>
            <tr className="border-b-4 border-foreground bg-foreground text-background">
                <th className="border-r border-background/30 p-2 text-left last:border-r-0">
                    Header
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="border-b border-foreground last:border-b-0">
                <td className="border-r border-foreground/30 p-2 last:border-r-0">
                    Cell
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### Horizontal Rule

```tsx
<hr className="my-8 border-t-4 border-foreground" />
```

### Images

Images are centered with frame border:

```tsx
<figure className="my-4">
    <div className="mx-auto w-fit border-4 border-foreground">
        <img src={src} alt={alt} className="block" />
    </div>
    {caption && (
        <figcaption className="mt-2 text-center text-sm text-foreground/70">
            {caption}
        </figcaption>
    )}
</figure>
```

## Known Issues and Considerations

### Image Component Hydration Error

**Problem**: Using `<figure>` for images causes hydration errors when the image is inside a `<p>` tag in markdown.

**Cause**: In HTML, `<figure>` cannot be a descendant of `<p>`. Markdown parsers often wrap standalone images in `<p>` tags.

**Solution**: Use `<span>` with `display: block` instead of `<figure>` for inline compatibility, or ensure images are not wrapped in paragraphs.

```tsx
// Instead of <figure>, use:
<span className="my-4 block">
    <span className="mx-auto block w-fit border-4 border-foreground">
        <img src={src} alt={alt} className="block max-w-full" />
    </span>
    {alt && (
        <span className="mt-2 block text-center text-sm text-foreground/70">{alt}</span>
    )}
</span>
```

### Blockquote Nested Paragraph

**Problem**: Blockquote content often contains `<p>` tags from markdown parsing, which may cause extra spacing.

**Consideration**: The blockquote component should handle nested paragraphs gracefully by removing extra padding from child `<p>` elements.

## Navigation Bar (Header)

The navigation bar combines the frame design with dynamic interactive elements.

### Structure

```tsx
<nav className="flex items-stretch border-b-4 border-foreground bg-background">
    {/* Hamburger Menu */}
    <Drawer.ToggleSwitch />

    {/* Logo - with right border */}
    <Link className="border-r-4 border-foreground bg-foreground text-background px-6 py-3 text-xl font-black">
        Yamada Hayao
    </Link>

    {/* Main Navigation */}
    <MainMenus horizontal />

    {/* Separator - thin vertical line */}
    <div className="ml-auto h-full w-1 bg-foreground" />

    {/* Other Links (縦棒, 切腹) */}
    <OtherLinks horizontal />
</nav>
```

### Site Title Styling

The site title uses inverted colors (white text on black background) with right border:

```tsx
<Link
    className="flex items-center border-r-4 border-foreground bg-foreground px-6 py-3 text-xl font-black tracking-tight text-background transition-all hover:bg-foreground/90"
    href="/"
>
    <span>Yamada Hayao</span>
</Link>
```

- **Inverted colors**: `bg-foreground text-background`
- **Right border**: `border-r-4 border-foreground` for Frame Design consistency
- **Typography**: `text-xl font-black tracking-tight`
- **Hover effect**: Subtle opacity reduction (`hover:bg-foreground/90`)

### Menu Item Styling (Horizontal/Navbar)

Menu items use an animated underline effect on hover with unified animation. All menu items (including 縦棒, 切腹) use the same foreground color for consistency:

```tsx
<Link
    className={classNames(
        "relative flex items-center py-4 text-sm font-bold uppercase tracking-wide transition-colors",
        "after:absolute after:bottom-2 after:h-1 after:w-0 after:bg-foreground after:transition-all after:duration-300",
        first ? "px-8" : "px-6",
        first
            ? "after:left-[60%] hover:after:left-[12%] hover:after:w-[88%]"
            : "after:left-1/2 hover:after:left-0 hover:after:w-full"
    )}
>
    {text}
</Link>
```

- **Typography**: `text-sm font-bold uppercase tracking-wide`
- **Underline position**: `after:bottom-2` (not bottom-0, to avoid overlapping with navbar border)
- **Underline animation**: Expands from center to full width on hover
- **Underline color**: Always `after:bg-foreground` (unified, no accent variant)
- **Duration**: 300ms transition

### Dropdown Menu Indicators

Dropdown menus (Blog, Projects) show a chevron icon that rotates when opened:

```tsx
<summary className="flex cursor-pointer items-center gap-1">
    {label}
    <FaChevronDown
        className={classNames(
            "text-[10px] transition-transform duration-200",
            isOpened && "rotate-180"
        )}
    />
</summary>
```

- **Icon size**: `text-[10px]` for subtle appearance
- **Rotation**: 180° when dropdown is open
- **Animation**: 200ms transition

### Menu Item Styling (Vertical/Drawer)

Drawer menu items use left border on hover instead of underline. All items use the same foreground styling:

```tsx
<Link
    className="flex items-center border-l-4 border-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:border-foreground hover:bg-foreground/5"
>
    {text}
</Link>
```

- **Left border animation**: `border-l-4 border-transparent` → `hover:border-foreground`
- **Background highlight**: `hover:bg-foreground/5` for subtle feedback

### Dropdown Menu

```tsx
<nav className="absolute z-50 min-w-[180px] border-4 border-foreground bg-background shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
    <Link className="block border-b-2 border-foreground/20 px-5 py-4 last:border-b-0 hover:bg-foreground hover:text-background">
        Menu Item
    </Link>
</nav>
```

- **Frame**: `border-4 border-foreground`
- **Shadow**: Offset black shadow for depth
- **Item hover**: Background inversion (no text movement to maintain stability)

## Drawer Content

The mobile drawer provides a rich navigation experience with multiple sections.

### Structure

```tsx
<div className="flex h-full flex-col">
    {/* Profile Header - Inverted colors */}
    <div className="border-b-4 border-foreground bg-foreground p-6 text-background">
        <h2 className="text-2xl font-black tracking-tight">Yamada Hayao</h2>
        <p className="mt-2 text-sm text-background/70">Web Developer / Security Enthusiast</p>
        <div className="mt-4 flex gap-3">
            {/* SNS Links */}
        </div>
    </div>

    {/* Navigation Section */}
    <div className="border-b-4 border-foreground">
        <div className="px-2 py-4">
            <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/50">
                Navigation
            </p>
            <MainManus onMenuItemClick={toggleDrawer} />
        </div>
    </div>

    {/* Other Links Section */}
    <div className="border-b-4 border-foreground">
        <div className="px-2 py-4">
            <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/50">
                Other
            </p>
            <OtherLinks onMenuItemClick={toggleDrawer} className="border-l-0" />
        </div>
    </div>

    {/* Quick Links */}
    <div className="flex-1 p-4">
        {/* ... */}
    </div>

    {/* Footer */}
    <div className="border-t-4 border-foreground p-4">
        <p className="text-center text-xs text-foreground/50">© 2024 Yamada Hayao</p>
    </div>
</div>
```

### Section Labels

Section labels use consistent styling:

```tsx
<p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/50">
    Section Name
</p>
```

## Home Page

The home page uses Frame Design with a vertical label and rich content sections. It uses reusable components for consistency.

**File:** `src/app/(hayao)/page.tsx`

### Structure

```tsx
<div className="border-4 border-foreground">
    <div className="grid grid-cols-[auto_1fr] gap-0">
        {/* Vertical Label - uses VerticalLabel component */}
        <VerticalLabel className="row-span-4 p-3">
            <h1 className="text-lg font-black tracking-tight">Yamada Hayao</h1>
        </VerticalLabel>

        {/* Hero Section - uses Section component */}
        <Section padding="lg" className="md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
                <div className="flex-1">
                    <h2 className="text-3xl font-black tracking-tight">山田ハヤオ</h2>
                    <p className="mt-2 text-sm text-foreground/70">Web Developer / Security Enthusiast</p>
                </div>
                <div className="flex gap-3">
                    <IconButton href="https://twitter.com/Hayao0819" icon={<FaTwitter />} label="Twitter" />
                    <IconButton href="https://github.com/Hayao0819" icon={<FaGithub />} label="GitHub" />
                </div>
            </div>
        </Section>

        {/* Navigation Grid - uses NavItem component */}
        <div className="grid border-b-4 border-foreground md:grid-cols-2">
            <NavItem href="/me" icon={<FaUser />} title="About Me" description="自己紹介" />
            <NavItem
                href="/blog/1"
                icon={<FaBlog />}
                title="Blog"
                description="技術記事など"
                className="border-t-4 border-foreground md:border-l-4 md:border-t-0"
            />
            {/* ... */}
        </div>

        {/* Recent Posts - uses Section component */}
        <Section padding="lg">
            {/* Post cards */}
        </Section>

        {/* Quick Links */}
        <Section isLast padding="lg">
            {/* Quick link items */}
        </Section>
    </div>
</div>
```

### Components Used

| Component | Purpose |
|-----------|---------|
| `VerticalLabel` | Site name in vertical orientation with inverted colors |
| `Section` | Content sections with consistent padding and border |
| `NavItem` | Navigation cards with icon, title, and description |
| `IconButton` | Social media icon buttons |

## Portfolio Page

The Portfolio page combines skills and project showcase in a unified layout. The `/skill` route redirects to `/portfolio`.

**File:** `src/app/(hayao)/portfolio/page.tsx`

### Structure

```tsx
<div className="border-4 border-foreground">
    <div className="grid grid-cols-[auto_1fr] gap-0">
        {/* Vertical Label - uses VerticalLabel component */}
        <VerticalLabel as="h1" className="text-2xl font-black">
            Portfolio
        </VerticalLabel>

        <div className="flex flex-col">
            {/* Introduction - uses Section component */}
            <Section>
                <p className="text-sm leading-relaxed">Description text</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <Link href="/something" className="border-b-2 border-foreground hover:border-b-4">
                        その他の制作物一覧 →
                    </Link>
                </div>
            </Section>

            {/* Skills Section - uses Section and SkillItem components */}
            <Section title="Skills" description="得意な技術スタック">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    <SkillItem icon={<SiNextdotjs />} name="Next.js" level="main" />
                    <SkillItem icon={<SiReact />} name="React" level="main" />
                    <SkillItem icon={<SiTailwindcss />} name="Tailwind" level="sub" />
                </div>
            </Section>

            {/* Languages Section - uses Section and PortfolioItem components */}
            <Section title="Languages" description="使用言語と制作物">
                <div className="grid gap-3 md:grid-cols-2">
                    <PortfolioItem icon={<SiGo />} name="Golang" projects={["lico", "ayaka"]} />
                    <PortfolioItem icon={<SiTypescript />} name="TypeScript" projects={["hayao0819.com"]} />
                </div>
            </Section>

            {/* Environment Section */}
            <Section title="Environment" description="開発環境" isLast>
                {/* Environment items */}
            </Section>
        </div>
    </div>
</div>
```

### Components Used

| Component | Purpose |
|-----------|---------|
| `VerticalLabel` | Page title in vertical orientation |
| `Section` | Content sections with title, description, and border |
| `SkillItem` | Skill display with icon and level distinction |
| `PortfolioItem` | Language/technology with associated projects |

### Skill Level Distinction

- **Main skills** (`level="main"`): Solid border with light background (`border-foreground bg-foreground/5`)
- **Sub skills** (`level="sub"` or omitted): Lighter border that strengthens on hover (`border-foreground/50 hover:border-foreground`)

## Social Page

The Social page displays social media links in a grid layout.

**File:** `src/app/(hayao)/social/page.tsx`

### Structure

```tsx
<div className="border-4 border-foreground">
    <div className="grid grid-cols-[auto_1fr] gap-0">
        <VerticalLabel as="h1" className="text-2xl font-black">
            Social
        </VerticalLabel>
        <div className="flex flex-col">
            <div className="grid md:grid-cols-2">
                <SocialLink
                    href="https://github.com/Hayao0819"
                    icon={<FaGithub />}
                    name="GitHub"
                    className="border-b-4 border-foreground md:border-r-4"
                />
                <SocialLink
                    href="https://twitter.com/Hayao0819"
                    icon={<FaTwitter />}
                    name="Twitter"
                    handle="@Hayao0819"
                    className="border-b-4 border-foreground"
                />
                {/* ... more social links */}
            </div>
        </div>
    </div>
</div>
```

### Components Used

| Component | Purpose |
|-----------|---------|
| `VerticalLabel` | Page title in vertical orientation |
| `SocialLink` | Social media link with icon, name, and optional handle |

### Grid Layout for Social Links

- **2-column grid** on medium screens and above (`md:grid-cols-2`)
- **Border handling**: Use `border-b-4` for bottom border, `md:border-r-4` for right border on left column items
- **Last row**: May span full width with `md:col-span-2`

## Blog Post List

### Category Badge

Categories in the blog post list use bordered badge style consistent with other pages:

```tsx
<Link
    href={`/blog/category/${category}`}
    className="border border-foreground px-2 py-0.5 text-xs hover:bg-foreground hover:text-background"
>
    {category}
</Link>
```

- **Border**: `border border-foreground`
- **Padding**: `px-2 py-0.5` for compact badge
- **Font**: `text-xs` for small size
- **Hover**: Background inversion

This style is unified across:
- Blog post detail page (category display)
- Blog sidebar (category list)
- Blog post list (category badges)

## Blog Sidebar

The blog sidebar handles overflow gracefully with truncation.

### Overflow Handling

```tsx
{/* Sidebar Container */}
<div className="w-72 shrink-0 overflow-hidden border-4 border-foreground">
    <div className="grid grid-cols-[auto_1fr] gap-0">
        {/* Vertical Label */}
        <div className="row-span-6 border-r-4 border-foreground p-2 [writing-mode:vertical-lr]">
            Menu
        </div>
        {/* Content with overflow handling */}
        <div className="flex min-w-0 flex-col overflow-hidden">
            {/* ... */}
        </div>
    </div>
</div>
```

Key classes for overflow prevention:
- **Container**: `shrink-0 overflow-hidden` prevents sidebar from shrinking and clips overflow
- **Content column**: `min-w-0 overflow-hidden` allows flex children to shrink below content size
- **Text items**: `truncate` or `max-w-full truncate` for long text

### Category/Tag Links

```tsx
<Link className="max-w-full truncate border-2 border-foreground px-2.5 py-1 text-xs font-medium">
    {category}
</Link>
```

### Recent Posts

```tsx
<Link className="group block min-w-0 border-l-2 border-foreground/20 pl-3">
    <p className="truncate text-sm group-hover:underline">{title}</p>
    <p className="truncate text-xs text-foreground/50">{category}</p>
</Link>
```

## Blog Article Links

Links within blog article content use underline animation with thickness change on hover.

```tsx
<Link
    href={href}
    className="relative text-accent transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent after:transition-all hover:after:h-1"
>
    {children}
</Link>
```

- **Color**: `text-accent` for visibility
- **Base underline**: `after:h-0.5 after:w-full after:bg-accent`
- **Hover effect**: `hover:after:h-1` (underline thickness increases)

## Blog Headings

Blog post headings use the frame design principles with border-based hierarchy.

### Heading Hierarchy

```tsx
// h2 - Major section divider
<div className="my-8 border-b-4 border-foreground pb-2">
    <h2 className="text-xl font-bold">{children}</h2>
</div>

// h3 - Subsection with left border
<div className="my-6 border-l-4 border-foreground pl-3">
    <h3 className="text-lg font-bold">{children}</h3>
</div>

// h4 - Minor subsection with lighter border
<div className="my-4 border-l-2 border-foreground/50 pl-3">
    <h4 className="text-base font-bold">{children}</h4>
</div>
```

| Level | Border Style | Purpose |
|-------|--------------|---------|
| h2 | `border-b-4` (bottom) | Major section divider |
| h3 | `border-l-4` (left) | Subsection indicator |
| h4 | `border-l-2 border-foreground/50` | Minor subsection |

## Drawer Animation

The mobile drawer uses tween animations for smooth, consistent motion:

```tsx
const leftdrawer_variants: Variants = {
    open: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            duration: 0.2,
            ease: "easeOut",
        },
    },
    closed: {
        opacity: 0,
        x: "-100%",
        transition: {
            type: "tween",
            duration: 0.2,
            ease: "easeIn",
        },
    },
};
```

- **Animation type**: `tween` (not spring) for predictable motion
- **Duration**: 0.2s for snappy feel
- **Easing**: `easeOut` for opening, `easeIn` for closing

## Files Updated

The following files implement this design system:

### Core Layout
- `src/components/layouts/Header.tsx` - Navigation bar with Frame Design and separator
- `src/components/layouts/CommonMenu.tsx` - Menu items with unified underline/border animations, dropdown indicators
- `src/components/layouts/Drawer/Drawer.tsx` - Mobile drawer with tween animation
- `src/components/layouts/Drawer/DrawerContent.tsx` - Rich drawer content with sections

### Pages
- `src/app/(hayao)/page.tsx` - Home page with Frame Design layout
- `src/app/(hayao)/blog/[slug]/page.tsx` - Blog list page
- `src/app/(hayao)/blog/posts/[...slug]/page.tsx` - Blog post detail page
- `src/app/(hayao)/blog/layout.tsx` - Blog layout with sidebar (overflow handling)
- `src/app/(hayao)/portfolio/page.tsx` - Unified Portfolio & Skills page
- `src/app/(hayao)/skill/page.tsx` - Redirects to /portfolio
- `src/app/(hayao)/social/page.tsx` - Social links page

### Reusable Components
- `src/components/elements/VerticalLabel.tsx` - Vertical text label with optional inverted colors
- `src/components/elements/Section.tsx` - Content section container with title and border
- `src/components/elements/NavItem.tsx` - Navigation item with icon, title, and description
- `src/components/elements/IconButton.tsx` - Square icon button with hover effect
- `src/components/elements/SkillItem.tsx` - Skill display with icon and level distinction
- `src/components/elements/PortfolioItem.tsx` - Language/technology with associated projects
- `src/components/elements/SocialLink.tsx` - Social media link with icon and handle

### Blog Components
- `src/components/layouts/blog/Toc.tsx` - Table of contents wrapper
- `src/components/elements/Markdown/Toc.tsx` - TOC content rendering with numbered items and left border hover
- `src/components/layouts/blog/PostPreview.tsx` - Blog post preview card with category badges
- `src/components/elements/Markdown/components.tsx` - Markdown component styling (links, images, inline code, etc.)
- `src/components/elements/Heading.tsx` - Blog heading styles
