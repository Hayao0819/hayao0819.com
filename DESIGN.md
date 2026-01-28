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

## Visual Hierarchy System

### 問題点と改善方針

従来のデザインでは全ての要素に同じ太さのボーダー（`border-4`）を使用していたため、視覚的階層が不明確でした。特にブログ記事一覧や個別記事ページでは情報量が多く、どこに注目すべきか分かりにくい状態でした。

**改善方針**: ボーダーの太さと色を階層化し、要素の重要度に応じて視覚的な重みを変える。

### Border Weight Hierarchy

| レベル | ボーダー太さ | 用途 | クラス |
|--------|------------|------|--------|
| **Primary** | 4px | メインコンテナの外枠、ページタイトル | `border-4 border-border` |
| **Secondary** | 2px | サブセクション、カード、サイドバー | `border-2 border-border` |
| **Tertiary** | 1px | 軽い区切り、リスト項目 | `border border-border/60` |
| **Subtle** | 1px (薄い) | ホバー前の状態、装飾的な区切り | `border border-border/30` |

### Border Color Hierarchy

| レベル | 色 | 用途 |
|--------|-----|------|
| **Full** | `border-border` | 重要な境界、メインフレーム |
| **Medium** | `border-border/60` | 中程度の区切り |
| **Light** | `border-border/30` | 軽い区切り、ホバー前 |
| **Subtle** | `border-border/20` | 最小限の区切り |

### Content Priority Levels

ページ内の要素は以下の優先度で視覚的重みを持たせる：

1. **Primary Content (メインコンテンツ)**
   - 記事本文、ページのメインセクション
   - 最も目立つ位置、十分な余白
   - ボーダー: Primary または なし

2. **Secondary Content (補助コンテンツ)**
   - サイドバー、ナビゲーション、メタ情報
   - Primary より軽いスタイル
   - ボーダー: Secondary または Tertiary

3. **Tertiary Content (三次的コンテンツ)**
   - タグ、カテゴリ、関連リンク
   - 控えめなスタイル
   - ボーダー: Tertiary または Subtle

## Core Design Patterns

### 1. Border System

ボーダーは要素の重要度に応じて使い分ける：

```tsx
// Primary: メインコンテナの外枠
<div className="border-4 border-border">

// Secondary: サブセクション、カード
<div className="border-2 border-border">

// Tertiary: 軽い区切り
<div className="border border-border/60">

// Subtle: 最小限の区切り（ホバーで強調）
<div className="border border-border/30 hover:border-border/60">
```

### セクション区切りの階層化

```tsx
// Primary divider: ページ内の主要セクション間
<div className="border-b-4 border-border">

// Secondary divider: サブセクション間
<div className="border-b-2 border-border/60">

// Tertiary divider: リスト項目など
<div className="border-b border-border/30">

// Spacing only: ボーダーなしで余白のみ
<div className="mb-6">
```

### 2. Grid Layout with Vertical Label

A distinctive pattern: vertical text label on the left side with content on the right:

```tsx
<div className="grid grid-cols-[auto_1fr]">
    {/* Vertical Label */}
    <div className="border-r-4 border-border p-3 text-sm font-bold [writing-mode:vertical-lr]">
        Label
    </div>
    {/* Content */}
    <div className="p-4">
        {/* ... */}
    </div>
</div>
```

### 3. Section Organization

セクションは重要度に応じたボーダーで区切る：

```tsx
<div className="flex flex-col">
    {/* Primary section with bold border */}
    <div className="border-b-4 border-border p-4">
        Primary Section
    </div>
    {/* Secondary sections with lighter border */}
    <div className="border-b-2 border-border/60 p-4">
        Secondary Section
    </div>
    {/* Tertiary with minimal border */}
    <div className="border-b border-border/30 p-4">
        Tertiary Section
    </div>
    <div className="p-4">
        Last Section (no bottom border)
    </div>
</div>
```

### 4. Interactive Elements

Buttons and links use border-based hover states:

```tsx
// Primary button
<Link
    className="border-2 border-border px-3 py-1.5 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
>
    Primary Action
</Link>

// Secondary/subtle button
<Link
    className="border border-border/50 px-2 py-1 text-xs hover:border-border hover:bg-foreground/5 transition-colors"
>
    Secondary Action
</Link>

// Text link with underline
<Link
    className="text-foreground/70 hover:text-foreground underline-offset-2 hover:underline transition-colors"
>
    Text Link
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

ページコンテナは Primary border を使用：

```tsx
<div className="border-4 border-border">
    <div className="grid grid-cols-[auto_1fr]">
        <h1 className="border-r-4 border-border p-4 text-3xl font-bold [writing-mode:vertical-lr]">
            Page Title
        </h1>
        <div className="flex flex-col">
            {/* Content sections */}
        </div>
    </div>
</div>
```

### Blog List Page Layout - 改善版

ブログ記事一覧ページは、メインコンテンツとサイドバーの視覚的重みを差別化：

```tsx
<div className="flex items-start gap-6">
    {/* Main Content - Primary */}
    <main className="min-w-0 flex-1">
        <div className="border-4 border-border">
            {/* Page Title with Vertical Label */}
            <div className="grid grid-cols-[auto_1fr]">
                <h1 className="border-r-4 border-border p-4 text-3xl font-bold [writing-mode:vertical-lr]">
                    Blog
                </h1>
                <div className="flex flex-col">
                    {/* Post List - 余白で分離、太いボーダーは使わない */}
                    <div className="flex flex-col gap-4 p-4">
                        {posts.map((post) => (
                            <PostPreview key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination - Secondary border */}
                    <div className="border-t-2 border-border/60 p-4">
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    </main>

    {/* Sidebar - Secondary, lighter style */}
    <aside className="hidden w-72 shrink-0 md:block">
        <BlogSidebar />
    </aside>
</div>
```

### Blog Post Detail Layout - 改善版

個別記事ページはコンテンツを最も目立たせ、メタ情報は控えめに：

```tsx
<div className="flex flex-col border-4 border-border">
    {/* Header - Primary border for main section */}
    <div className="grid grid-cols-[auto_1fr] border-b-2 border-border/60">
        <div className="border-r-4 border-border p-3 [writing-mode:vertical-lr]">
            Post
        </div>
        <div className="flex flex-col">
            {/* Title - 最も目立つ */}
            <div className="p-6">
                <h1 className="text-2xl font-bold leading-tight md:text-3xl">
                    {title}
                </h1>
            </div>
            {/* Meta info - 控えめ */}
            <div className="border-t border-border/30 px-6 py-3">
                <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <span>{date}</span>
                    <span>{category}</span>
                </div>
            </div>
        </div>
    </div>

    {/* Table of Contents - Secondary border */}
    <div className="border-b border-border/30">
        {/* TOC content */}
    </div>

    {/* Main Content - 余白を十分に確保 */}
    <div className="grow p-6 md:p-8">
        <article className="prose">
            {/* Article content */}
        </article>
    </div>

    {/* Footer - Tertiary border */}
    <div className="border-t border-border/30 p-4">
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

新しいコンポーネントを作成する際のチェックリスト：

### 視覚的階層

- [ ] 要素の重要度に応じたボーダー太さを選択
  - Primary: `border-4 border-border`
  - Secondary: `border-2 border-border/60`
  - Tertiary: `border border-border/30`
- [ ] セクション区切りは重要度に応じて選択
  - Primary: `border-b-4 border-border`
  - Secondary: `border-b-2 border-border/60`
  - Tertiary: `border-b border-border/30`
  - なし: 余白のみで分離

### 基本パターン

- [ ] Vertical labels use `[writing-mode:vertical-lr]`
- [ ] Grid layout uses `grid-cols-[auto_1fr]` pattern
- [ ] Colors use semantic tokens (`foreground`, `background`, `accent`, `border`)

### インタラクティブ要素

- [ ] ボタン/リンクにホバー状態を設定
- [ ] フォーカスインジケーターを設定 (`focus-visible:outline`)
- [ ] 最小タッチターゲット 44x44px を確保

### アクセシビリティ

- [ ] テキストのコントラスト比 4.5:1 以上
- [ ] 適切なHTML要素を使用（`<nav>`, `<main>`, `<article>` など）
- [ ] アイコンボタンに `aria-label` を設定
- [ ] `motion-reduce:` でアニメーション無効化オプション

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

ホームページは視覚的階層を明確にし、主要なナビゲーション要素を強調する。

**File:** `src/app/(hayao)/page.tsx`

### 設計原則

1. **Hero Section (プロフィール)** - 最も目立つ位置、大きなタイポグラフィ
2. **Navigation Grid** - ユーザーが次にアクションを取るべき主要エリア
3. **Recent Posts** - Secondary content、控えめなスタイル
4. **Quick Links** - Tertiary content、最小限のスタイル

### Structure - 改善版

```tsx
<div className="border-4 border-border">
    <div className="grid grid-cols-[auto_1fr] gap-0">
        {/* Vertical Label */}
        <VerticalLabel className="row-span-4 p-3">
            <h1 className="text-lg font-black tracking-tight">Yamada Hayao</h1>
        </VerticalLabel>

        {/* Hero Section - Primary, 最も目立つ */}
        <section className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
                <div className="flex-1">
                    <h2 className="text-3xl font-black tracking-tight md:text-4xl">山田ハヤオ</h2>
                    <p className="text-foreground/60 mt-2">Web Developer / Security Enthusiast</p>
                    <p className="text-foreground/70 mt-4 text-sm leading-relaxed">
                        自己紹介文...
                    </p>
                </div>
                <div className="flex gap-3">
                    <IconButton href="..." icon={<FaTwitter />} label="Twitter" />
                    <IconButton href="..." icon={<FaGithub />} label="GitHub" />
                </div>
            </div>
        </section>

        {/* Navigation Grid - Primary border between items */}
        <div className="grid border-y-4 border-border md:grid-cols-2">
            <NavItem href="/me" icon={<FaUser />} title="About Me" description="自己紹介" />
            <NavItem
                href="/blog/1"
                icon={<FaBlog />}
                title="Blog"
                description="技術記事など"
                className="border-t-4 border-border md:border-l-4 md:border-t-0"
            />
            <NavItem
                href="/portfolio"
                icon={<FaBriefcase />}
                title="Portfolio"
                description="スキル・制作物"
                className="border-t-4 border-border"
            />
            <NavItem
                href="/social"
                icon={<FaUsers />}
                title="Social"
                description="SNS・連絡先"
                className="border-t-4 border-border md:border-l-4"
            />
        </div>

        {/* Recent Posts - Secondary, 控えめなスタイル */}
        <section className="border-b border-border/30 p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold">
                    <FaBlog className="text-foreground/50" />
                    <span>Recent Posts</span>
                </h3>
                <Link href="/blog/1" className="text-foreground/50 hover:text-foreground text-sm">
                    View All →
                </Link>
            </div>
            {/* Post cards with subtle borders */}
            <div className="grid gap-3 md:grid-cols-3">
                {recentPosts.map((post) => (
                    <Link
                        key={post.id}
                        href={post.url}
                        className="group border border-border/30 hover:border-border/60 p-4 transition-all"
                    >
                        <p className="truncate font-medium group-hover:underline">{post.title}</p>
                        <p className="text-foreground/40 mt-1 text-xs">{post.category}</p>
                    </Link>
                ))}
            </div>
        </section>

        {/* Quick Links - Tertiary, 最小限のスタイル */}
        <section className="p-6">
            <div className="flex flex-wrap items-center gap-4">
                <span className="text-foreground/50 flex items-center gap-2 text-sm">
                    <FaLink />
                    Quick Links:
                </span>
                <Link href="/social" className="text-foreground/70 hover:text-foreground text-sm hover:underline">
                    Social
                </Link>
                <Link href="/history" className="text-foreground/70 hover:text-foreground text-sm hover:underline">
                    History
                </Link>
                {/* ... */}
            </div>
        </section>
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

ブログ記事一覧は情報量が多いため、視覚的階層を明確にすることが重要。

### 設計原則

1. **記事カードは余白で分離** - 太いボーダーで区切らず、余白（gap）で分離
2. **カードは控えめなスタイル** - 薄いボーダーまたはホバー時のみボーダー表示
3. **タイトルを最も目立たせる** - フォントサイズとウェイトで階層化
4. **メタ情報は控えめに** - 色を薄く、サイズを小さく

### Post Card (PostPreview) - 改善版

```tsx
<article className="group">
    <div className="border border-border/30 hover:border-border/60 rounded-sm p-5 transition-all">
        {/* Header: Category & Date - 最も控えめ */}
        <div className="mb-3 flex items-center justify-between">
            <Link
                href={`/blog/category/${category}`}
                className="bg-foreground/5 hover:bg-foreground hover:text-background rounded-sm px-2.5 py-1 text-xs font-medium transition-colors"
            >
                {category}
            </Link>
            <span className="text-foreground/50 text-xs tabular-nums">
                {date}
            </span>
        </div>

        {/* Title - 最も目立つ */}
        <Link href={fullURL}>
            <h2 className="text-foreground mb-2 text-lg font-bold leading-snug">
                {title}
            </h2>
        </Link>

        {/* Tags - 控えめ */}
        <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
                <Link
                    href={`/blog/tag/${tag}`}
                    className="text-foreground/40 hover:text-foreground text-xs transition-colors"
                >
                    #{tag}
                </Link>
            ))}
        </div>

        {/* Summary - 中程度 */}
        <p className="text-foreground/60 mb-4 line-clamp-3 text-sm leading-relaxed">
            {summary}
        </p>

        {/* Read More - 控えめなアクション */}
        <Link
            href={fullURL}
            className="text-foreground/60 hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
            <span>Read More</span>
            <FaArrowRight className="text-xs" />
        </Link>
    </div>
</article>
```

### Category Badge

カテゴリバッジは背景色で区別し、ボーダーを使わない：

```tsx
<Link
    href={`/blog/category/${category}`}
    className="bg-foreground/5 hover:bg-foreground hover:text-background rounded-sm px-2.5 py-1 text-xs font-medium transition-colors"
>
    {category}
</Link>
```

- **背景**: `bg-foreground/5` で軽く区別
- **ホバー**: 色反転で強調
- **ボーダー**: なし（軽量化）

## Blog Sidebar

サイドバーはSecondary Contentとして、メインコンテンツより軽いスタイルにする。

### 設計原則

1. **外枠は`border-2`** - メインより細い
2. **セクション区切りは`border-b`** - 最小限のボーダー
3. **背景色で区切り** - ボーダーの代わりに微妙な背景色
4. **縦書きラベルはオプション** - 情報密度が高いページでは省略可

### Sidebar Container - 改善版

```tsx
{/* Sidebar Container - Secondary border */}
<aside className="w-72 shrink-0 overflow-hidden border-2 border-border/60 rounded-sm">
    <div className="flex flex-col">
        {/* Profile Section - 背景色で区別 */}
        <div className="bg-foreground/5 p-4">
            <p className="font-bold">Yamada Hayao</p>
            <p className="text-foreground/60 mt-1 text-xs">Profile description</p>
        </div>

        {/* Categories - Tertiary border */}
        <div className="border-t border-border/30 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground/50">
                Categories
            </p>
            <div className="flex flex-wrap gap-1.5">
                {/* Category links */}
            </div>
        </div>

        {/* Tags */}
        <div className="border-t border-border/30 p-4">
            {/* ... */}
        </div>

        {/* Recent Posts */}
        <div className="border-t border-border/30 p-4">
            {/* ... */}
        </div>
    </div>
</aside>
```

### Category/Tag Links in Sidebar

```tsx
{/* Category - より目立つ */}
<Link className="bg-foreground/5 hover:bg-foreground hover:text-background max-w-full truncate rounded-sm px-2.5 py-1 text-xs font-medium transition-colors">
    {category}
</Link>

{/* Tag - 控えめ */}
<Link className="text-foreground/50 hover:text-foreground text-xs transition-colors">
    #{tag}
</Link>
```

### Recent Posts in Sidebar

```tsx
<Link className="group block min-w-0 py-2 transition-colors">
    <p className="truncate text-sm group-hover:text-foreground/80 group-hover:underline">
        {title}
    </p>
    <p className="text-foreground/40 truncate text-xs">
        {category}
    </p>
</Link>
```

### Overflow Handling

Key classes for overflow prevention:
- **Container**: `shrink-0 overflow-hidden` prevents sidebar from shrinking
- **Content column**: `min-w-0` allows flex children to shrink below content size
- **Text items**: `truncate` for long text

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

## Accessibility Guidelines

アクセシビリティを考慮したデザインガイドライン。

### Color Contrast

| 要素 | 最小コントラスト比 | 推奨クラス |
|------|------------------|-----------|
| 本文テキスト | 4.5:1 (WCAG AA) | `text-foreground` |
| 大きな見出し | 3:1 (WCAG AA) | `text-foreground` |
| プレースホルダ/補助テキスト | 4.5:1 | `text-foreground/70` 以上 |
| リンク | 4.5:1 | `text-accent` または `text-foreground` |
| 無効状態 | - | `text-foreground/50`（操作不可を示す） |

**注意**: `text-foreground/40` 以下は補助的な装飾にのみ使用し、重要な情報には使用しない。

### Focus Indicators

インタラクティブ要素には明確なフォーカスインジケーターを設定：

```tsx
// ボタン・リンクのフォーカス
<Link className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">

// フォーム要素のフォーカス
<input className="focus:border-foreground focus:ring-1 focus:ring-foreground">
```

- **outline**: `outline-2 outline-offset-2` で十分な視認性
- **色**: `outline-foreground` で一貫性
- **`:focus-visible`**: キーボードフォーカス時のみ表示

### Semantic HTML

適切なHTML要素を使用：

| 目的 | 要素 | 例 |
|------|------|-----|
| ナビゲーション | `<nav>` | メニュー、サイドバー |
| メインコンテンツ | `<main>` | ページの主要コンテンツ |
| 記事 | `<article>` | ブログ記事、ポストカード |
| セクション | `<section>` | 論理的なセクション |
| 補助コンテンツ | `<aside>` | サイドバー |
| 見出し階層 | `<h1>`〜`<h6>` | 適切な階層を維持 |

### Touch Targets

タッチデバイスでの操作性を確保：

```tsx
// 最小タッチターゲット: 44x44px (WCAG 2.2)
<button className="min-h-[44px] min-w-[44px] p-3">

// リストアイテム
<Link className="block py-3 px-4">
```

- **最小サイズ**: 44x44px
- **余白**: 十分なパディングでターゲット拡大

### Motion & Animation

動きに敏感なユーザーへの配慮：

```tsx
// reduced-motion対応
<motion.div
    variants={variants}
    initial="offscreen"
    whileInView="onscreen"
    className="motion-reduce:transform-none motion-reduce:transition-none"
>
```

- **`prefers-reduced-motion`**: アニメーションを無効化
- **Tailwind**: `motion-reduce:` プレフィックスを使用

### Screen Reader

スクリーンリーダー対応：

```tsx
// 視覚的に隠すが読み上げ可能
<span className="sr-only">メニューを開く</span>

// アイコンボタンにラベル
<button aria-label="Twitter">
    <FaTwitter />
</button>

// 現在のページを示す
<nav aria-label="メインナビゲーション">
    <Link aria-current="page">...</Link>
</nav>
```

### Keyboard Navigation

キーボード操作のサポート：

1. **Tab順序**: 論理的な順序で移動
2. **フォーカストラップ**: モーダル/ドロワー内でフォーカスを維持
3. **Escape**: モーダル/ドロワーを閉じる
4. **Enter/Space**: ボタン/リンクのアクティベート

### 視覚的階層とアクセシビリティ

視覚的階層の改善はアクセシビリティにも貢献：

1. **明確なコントラスト** - 重要な要素は濃い色、補助的な要素は薄い色
2. **十分な余白** - 要素間の区別を明確に
3. **一貫したパターン** - 同じ機能には同じスタイルを適用
4. **段階的な強調** - Primary → Secondary → Tertiary の段階で重要度を表現

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
