"use client";

import { usePathname } from "next/navigation";

import { Link } from "@/components/elements/Link";
import { cn } from "@/lib/utils";

import * as Drawer from "./Drawer";

const NAV = [
    { href: "/", label: "Top", match: /^\/$/ },
    { href: "/blog/1", label: "Blog", match: /^\/blog\/(\d+|posts|category|tag)/ },
    { href: "/portfolio", label: "Portfolio", match: /^\/portfolio/ },
    { href: "/social", label: "Social", match: /^\/social/ },
    { href: "/blog/about", label: "About", match: /^\/blog\/about/ },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-background">
            {/* Nameplate row */}
            <div className="max-w-shell mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center px-6 pt-6 pb-5 sm:px-10 md:pt-9 md:pb-7">
                <div className="flex items-center justify-start">
                    <span className="lg:hidden">
                        <Drawer.ToggleSwitch />
                    </span>
                    <p
                        className="tracked-caps text-foreground/70 hidden text-[11px] tabular-nums lg:block"
                        suppressHydrationWarning
                    >
                        {new Date().toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            weekday: "long",
                        })}
                    </p>
                </div>

                <Link
                    href="/"
                    className="font-display text-ink block text-center text-[1.75rem] leading-none font-black tracking-tight md:text-5xl"
                >
                    Yamada Hayao
                </Link>

                <p className="tracked-caps text-accent hidden text-right text-[11px] lg:block">hayao0819.com</p>
            </div>

            {/* The one heavy rule of the page — the masthead rule */}
            <div className="max-w-shell mx-auto w-full px-6 sm:px-10">
                <div className="bg-ink h-[3px] w-full" aria-hidden />
            </div>

            {/* Section navigation */}
            <nav className="border-foreground/15 hidden border-b lg:block" aria-label="Primary">
                <div className="max-w-shell mx-auto flex w-full items-center justify-center gap-12 px-6 sm:px-10">
                    {NAV.map((item) => {
                        const active = item.match.test(pathname ?? "");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "tracked-caps flex h-11 items-center text-[11px] transition-colors",
                                    active ? "text-accent" : "text-foreground/75 hover:text-accent",
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
            <div className="border-foreground/15 border-b lg:hidden" aria-hidden />
        </header>
    );
}
