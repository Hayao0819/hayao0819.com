"use client";

import classNames from "clsx";
import { usePathname } from "next/navigation";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";

import { useDrawer } from ".";

const PRIMARY = [
    { href: "/", label: "Top" },
    { href: "/blog/1", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/social", label: "Social" },
    { href: "/blog/about", label: "About" },
];

const SECONDARY = [
    { href: "/history", label: "History" },
    { href: "/something", label: "Something" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
    { href: "/tatebou", label: "縦棒" },
    { href: "https://seppuku.club/", label: "切腹" },
];

const EXTERNAL = [
    { href: "https://twitter.com/Hayao0819", label: "twitter", Icon: FaTwitter },
    { href: "https://github.com/Hayao0819", label: "github", Icon: FaGithub },
    { href: "https://instagram.com/Hayao0819", label: "instagram", Icon: FaInstagram },
];

export default function DrawerContent() {
    const [, toggleDrawer] = useDrawer();
    const pathname = usePathname() ?? "/";

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        if (href === "/blog/1") return pathname.startsWith("/blog") && !pathname.startsWith("/blog/about");
        return pathname.startsWith(href);
    };

    return (
        <div className="font-mono-chrome flex h-full flex-col">
            <header className="border-foreground/15 flex items-center justify-between border-b px-6 py-3">
                <p className="text-[13px]">
                    <span className="text-foreground/40" aria-hidden="true">
                        ~
                    </span>{" "}
                    <span className="font-semibold">hayao0819</span>
                    <span className="text-foreground/65">.com</span>
                </p>
                <button
                    className="text-foreground/70 hover:text-foreground -mx-2 inline-flex min-h-11 items-center gap-1 px-2 text-[11px] tracking-[0.14em]"
                    onClick={toggleDrawer}
                    aria-label="close menu"
                >
                    <span className="text-foreground/35">[</span>
                    <span>close</span>
                    <span className="text-foreground/35">]</span>
                </button>
            </header>

            <nav className="px-6 pt-6">
                <ul className="flex flex-col">
                    {PRIMARY.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={toggleDrawer}
                                    aria-current={active ? "page" : undefined}
                                    className={classNames(
                                        "nav-path flex min-h-11 items-center py-2 text-[14px] tracking-[0.14em] lowercase",
                                        active ? "text-accent" : "text-foreground/85 hover:text-accent",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <nav className="px-6 pt-6">
                <hr className="hairline mb-5" />
                <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] tracking-[0.14em]">
                    {SECONDARY.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={toggleDrawer}
                                className="text-foreground/70 hover:text-foreground inline-flex min-h-9 items-center py-1"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex-1" />

            <div className="border-foreground/15 border-t px-6 py-5">
                <div className="text-foreground/70 flex items-center gap-5 text-[14px]">
                    {EXTERNAL.map(({ href, label, Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            aria-label={label}
                            className="hover:text-foreground -m-2.5 inline-flex p-2.5"
                        >
                            <Icon />
                        </Link>
                    ))}
                </div>
                <p className="text-foreground/65 mt-4 text-[10.5px] tracking-[0.14em]">
                    &copy; {new Date().getFullYear()} Yamada Hayao
                </p>
            </div>
        </div>
    );
}
