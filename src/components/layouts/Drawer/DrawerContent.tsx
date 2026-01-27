"use client";

import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";

import { MainManus, OtherLinks } from "../CommonMenu";
import { useDrawer } from ".";

export default function DrawerContent() {
    const [, toggleDrawer] = useDrawer();

    return (
        <div className="flex h-full flex-col">
            {/* Profile Header */}
            <div className="border-border bg-foreground text-background border-b-4 p-6">
                <h2 className="text-2xl font-black tracking-tight">Yamada Hayao</h2>
                <p className="text-background/70 mt-2 text-sm">Web Developer / Security Enthusiast</p>
                <div className="mt-4 flex gap-3">
                    <Link
                        href="https://twitter.com/Hayao0819"
                        className="border-background/30 hover:border-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center border-2 transition-all"
                    >
                        <FaTwitter className="text-lg" />
                    </Link>
                    <Link
                        href="https://github.com/Hayao0819"
                        className="border-background/30 hover:border-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center border-2 transition-all"
                    >
                        <FaGithub className="text-lg" />
                    </Link>
                    <Link
                        href="https://instagram.com/Hayao0819"
                        className="border-background/30 hover:border-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center border-2 transition-all"
                    >
                        <FaInstagram className="text-lg" />
                    </Link>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="border-border border-b-4">
                <div className="px-2 py-4">
                    <p className="text-foreground/50 mb-2 px-4 text-xs font-bold tracking-wider uppercase">Navigation</p>
                    <MainManus onMenuItemClick={toggleDrawer} />
                </div>
            </div>

            {/* Other Links */}
            <div className="border-border border-b-4">
                <div className="px-2 py-4">
                    <p className="text-foreground/50 mb-2 px-4 text-xs font-bold tracking-wider uppercase">Other</p>
                    <OtherLinks onMenuItemClick={toggleDrawer} className="border-l-0" />
                </div>
            </div>

            {/* Quick Links */}
            <div className="flex-1 p-4">
                <p className="text-foreground/50 mb-3 text-xs font-bold tracking-wider uppercase">Quick Links</p>
                <div className="flex flex-col gap-2">
                    <Link href="/blog/1" onClick={toggleDrawer} className="group flex items-center gap-2 text-sm">
                        <span className="bg-foreground/30 group-hover:bg-foreground h-1.5 w-1.5 transition-all" />
                        <span className="group-hover:underline">Blog</span>
                    </Link>
                    <Link href="/portfolio" onClick={toggleDrawer} className="group flex items-center gap-2 text-sm">
                        <span className="bg-foreground/30 group-hover:bg-foreground h-1.5 w-1.5 transition-all" />
                        <span className="group-hover:underline">Portfolio</span>
                    </Link>
                    <Link href="/contact" onClick={toggleDrawer} className="group flex items-center gap-2 text-sm">
                        <span className="bg-foreground/30 group-hover:bg-foreground h-1.5 w-1.5 transition-all" />
                        <span className="group-hover:underline">Contact</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="border-border border-t-4 p-4">
                <p className="text-foreground/50 text-center text-xs">&copy; 2024 Yamada Hayao</p>
            </div>
        </div>
    );
}
