"use client";

import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";

import { useDrawer } from ".";

const BLOG_ITEMS = [
    { href: "/blog/1", text: "記事一覧" },
    { href: "/blog/category/技術系/", text: "技術系" },
    { href: "/blog/tag", text: "タグ一覧" },
    { href: "/blog/about", text: "About" },
];

const PROJECT_ITEMS = [
    { href: "/portfolio", text: "スキル・制作物" },
    { href: "/something", text: "その他成果物" },
    { href: "/history", text: "経歴" },
    { href: "/events", text: "イベント参加" },
];

const OTHER_LINKS = [
    { href: "/tatebou", text: "縦棒" },
    { href: "https://seppuku.club/", text: "切腹" },
];

const QUICK_LINKS = [
    { href: "/blog/1", text: "Blog" },
    { href: "/portfolio", text: "Portfolio" },
    { href: "/contact", text: "Contact" },
];

export default function DrawerContent() {
    const [, toggleDrawer] = useDrawer();

    return (
        <div className="flex h-full flex-col overflow-y-auto px-8 pt-10 pb-10 sm:px-12">
            {/* Nameplate */}
            <div className="mb-10">
                <div className="flex items-start justify-between gap-4">
                    <Link
                        href="/"
                        onClick={toggleDrawer}
                        className="font-display text-ink block text-3xl leading-none font-black tracking-tight"
                    >
                        Yamada Hayao
                    </Link>
                    <button
                        className="hover:text-foreground text-foreground/70 -mt-2 -mr-3 flex h-11 w-11 shrink-0 items-center justify-center text-xl transition-colors"
                        onClick={toggleDrawer}
                        aria-label="Close menu"
                    >
                        <FaXmark />
                    </button>
                </div>
                <p className="text-foreground/70 mt-3 text-xs">Web Developer / Security Enthusiast</p>
                <div className="mt-5 flex gap-2">
                    <Link
                        href="https://twitter.com/Hayao0819"
                        className="text-foreground/75 hover:text-accent flex h-11 w-11 items-center justify-center transition-colors first:-ml-3"
                        aria-label="Twitter"
                    >
                        <FaTwitter className="text-lg" />
                    </Link>
                    <Link
                        href="https://github.com/Hayao0819"
                        className="text-foreground/75 hover:text-accent flex h-11 w-11 items-center justify-center transition-colors"
                        aria-label="GitHub"
                    >
                        <FaGithub className="text-lg" />
                    </Link>
                    <Link
                        href="https://instagram.com/Hayao0819"
                        className="text-foreground/75 hover:text-accent flex h-11 w-11 items-center justify-center transition-colors"
                        aria-label="Instagram"
                    >
                        <FaInstagram className="text-lg" />
                    </Link>
                </div>
            </div>

            {/* Navigation */}
            <nav className="mb-10" aria-label="Navigation">
                <h2 className="tracked-caps text-foreground/70 mb-3 text-[10px]">Navigation</h2>
                <ul className="flex flex-col">
                    <li className="border-foreground/10 border-t">
                        <Link
                            href="/"
                            onClick={toggleDrawer}
                            className="font-display hover:text-accent block py-3 text-xl font-bold transition-colors"
                        >
                            Top
                        </Link>
                    </li>
                    <li className="border-foreground/10 border-t py-3">
                        <p className="font-display text-xl font-bold">Blog</p>
                        <ul className="mt-2 flex flex-col">
                            {BLOG_ITEMS.map((i) => (
                                <li key={i.href}>
                                    <Link
                                        href={i.href}
                                        onClick={toggleDrawer}
                                        className="text-foreground/75 hover:text-accent block py-3 text-sm transition-colors"
                                    >
                                        {i.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="border-foreground/10 border-t py-3">
                        <p className="font-display text-xl font-bold">Projects</p>
                        <ul className="mt-2 flex flex-col">
                            {PROJECT_ITEMS.map((i) => (
                                <li key={i.href}>
                                    <Link
                                        href={i.href}
                                        onClick={toggleDrawer}
                                        className="text-foreground/75 hover:text-accent block py-3 text-sm transition-colors"
                                    >
                                        {i.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="border-foreground/10 border-y">
                        <Link
                            href="/social"
                            onClick={toggleDrawer}
                            className="font-display hover:text-accent block py-3 text-xl font-bold transition-colors"
                        >
                            Social
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Other */}
            <nav className="mb-10" aria-label="Other">
                <h2 className="tracked-caps text-foreground/70 mb-3 text-[10px]">Other</h2>
                <ul className="flex flex-col">
                    {OTHER_LINKS.map((i) => (
                        <li key={i.href} className="border-foreground/10 border-t last:border-b">
                            <Link
                                href={i.href}
                                onClick={toggleDrawer}
                                className="font-display hover:text-accent block py-3 text-base font-bold transition-colors"
                            >
                                {i.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Quick Links */}
            <nav className="mb-10" aria-label="Quick Links">
                <h2 className="tracked-caps text-foreground/70 mb-3 text-[10px]">Quick Links</h2>
                <ul className="flex flex-col gap-1">
                    {QUICK_LINKS.map((i) => (
                        <li key={i.href}>
                            <Link
                                href={i.href}
                                onClick={toggleDrawer}
                                className="text-foreground/75 hover:text-accent block py-3 text-sm transition-colors"
                            >
                                {i.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <p className="text-foreground/70 mt-auto text-xs">&copy; 2024 Yamada Hayao</p>
        </div>
    );
}
