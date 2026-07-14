"use client";

import classNames from "clsx";
import { usePathname } from "next/navigation";

import { Link } from "@/components/elements/Link";

import * as Drawer from "./Drawer";

const NAV = [
    { href: "/blog/1", text: "Blog" },
    { href: "/portfolio", text: "Portfolio" },
    { href: "/social", text: "Social" },
    { href: "/blog/about", text: "About" },
];

export default function Header() {
    const pathname = usePathname() ?? "/";

    const isActive = (href: string) => {
        if (href === "/blog/1") return pathname.startsWith("/blog") && !pathname.startsWith("/blog/about");
        return pathname.startsWith(href);
    };

    return (
        <header className="relative z-10 border-foreground/25 border-b bg-background">
            <div className="mx-auto flex h-14 max-w-[60rem] items-center justify-between px-6 md:px-8">
                {/* Sitemark — text only, mono */}
                <Link href="/" className="inline-flex items-baseline gap-1.5 text-[14px] leading-none tracking-tight">
                    <span className="text-foreground/40" aria-hidden="true">
                        ~
                    </span>
                    <span className="font-semibold">hayao0819</span>
                    <span className="text-foreground/65">.com</span>
                </Link>

                {/* Nav — plain mono links */}
                <nav className="hidden items-baseline gap-6 text-[12px] lowercase tracking-[0.14em] md:flex">
                    {NAV.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={classNames(
                                    "before:inline-block before:w-[1.15ch] before:opacity-0 before:transition-opacity before:duration-150 before:ease-[ease] before:content-['>'_/_''] hover:before:opacity-100 focus-visible:before:opacity-100 motion-reduce:before:transition-none [&[aria-current]]:before:opacity-100",
                                    active ? "text-accent" : "text-foreground/65 hover:text-foreground",
                                )}
                            >
                                {item.text}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile drawer toggle */}
                <div className="md:hidden">
                    <Drawer.ToggleSwitch />
                </div>
            </div>
        </header>
    );
}
