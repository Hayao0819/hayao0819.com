# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog for Hayao Yamada (hayao0819.com), built with Next.js 15 App Router. The site is statically exported and deployed to GitHub Pages.

## Development Commands

```bash
pnpm install              # Install dependencies
pnpm run dev              # Start development server
pnpm run build            # Full build (Go blogtool + Next.js)
pnpm run lint             # ESLint check
pnpm fix                  # Auto-fix ESLint issues
pnpm run newpost          # Interactive wizard for creating new blog posts
```

## Architecture

### Tech Stack

- **Framework:** Next.js 15 with App Router, React 19
- **Styling:** Tailwind CSS 3 + DaisyUI + SCSS
- **State:** Jotai (atom-based)
- **Content:** MDX via next-mdx-remote, unified ecosystem (remark/rehype)
- **Build:** pnpm 10, Node 20, TypeScript 5

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (hayao)/           # Main site route group
│   │   ├── blog/          # Blog with pagination ([slug]) and posts ([...slug])
│   │   ├── portfolio/     # Portfolio page
│   │   └── ...            # Other sections (skill, history, contact, etc.)
│   └── playground/        # Demo/learning pages
├── components/
│   ├── elements/          # Atomic UI components (Markdown/, Link, Heading, etc.)
│   └── layouts/           # Layout components (CommonMenu, Drawer, blog/)
├── lib/
│   ├── blog/              # Blog logic (config.ts, categories.ts, post.ts, postlist.ts)
│   └── markdown/          # MDX processing utilities
├── hooks/                 # Custom React hooks
└── features/              # Feature-specific components (portfolio/, GyaguList)

posts/                     # Blog content in YYYYMMDD folders with index.mdx
tools/blogtool.go          # Go CLI for blog management
```

### Key Patterns

- **Route Groups:** `(hayao)` organizes main site pages without affecting URL
- **Dynamic Routes:** `[slug]` for pagination, `[...slug]` for catch-all post paths
- **Static Generation:** Uses `generateStaticParams()` for all dynamic routes
- **Content Processing:** MDX files with YAML frontmatter, processed through remark/rehype pipeline with Shiki syntax highlighting

### Blog System

- Posts stored in `/posts/YYYYMMDD/index.mdx` format
- Configuration in `src/lib/blog/config.ts`: 9 posts per page, categories (Private, Tech, Game)
- Go-based blogtool (`pnpm run newpost`) creates posts with proper frontmatter template

### Deployment

- Static export (`output: "export"` in next.config.mjs)
- GitHub Actions deploys to GitHub Pages
- Conditional basePath/assetPrefix when `GITHUB_PAGES=true`

## Code Style

- 4-space indentation, double quotes
- Tailwind classes sorted by Prettier plugin
- React Compiler enabled (experimental)
- ESLint flat config with TypeScript, React, and MDX plugins

## Claude Code Development Guidelines

### Development Server Management

**重要**: 開発サーバー（`pnpm run dev`）を起動した場合は、必ず終了させること。

- 開発サーバーをバックグラウンドで起動した場合は、作業完了時に `KillShell` ツールで終了する
- セッション終了前に `ps aux | grep -E "next|pnpm.*dev"` でゾンビプロセスが残っていないか確認する
- プロセスが残っている場合は `pkill -f "next dev"` で終了させる

### ブラウザ確認時の手順

1. `pnpm run dev` をバックグラウンドで起動（`run_in_background: true`）
2. Playwrightでブラウザ確認
3. `mcp__playwright__browser_close` でブラウザを閉じる
4. `KillShell` で開発サーバーを終了
