"use client";

import { Link } from "@/components/elements/Link";

import { MainManus, OtherLinks } from "./CommonMenu";
import * as Drawer from "./Drawer";

export default function Header() {
    return (
        <nav className="border-border bg-background flex items-stretch border-b-4">
            {/* Hamburger Menu */}
            <Drawer.ToggleSwitch />

            {/* Logo */}
            <Link
                className="border-border bg-foreground text-background hover:bg-foreground/90 flex items-center border-r-4 px-6 py-3 text-xl font-black tracking-tight transition-all"
                href="/"
            >
                <span>Yamada Hayao</span>
            </Link>

            {/* Main Navigation */}
            <div className="hidden grow items-center md:flex">
                <MainManus horizontal className="h-full" />
            </div>

            {/* Separator */}
            <div className="bg-foreground ml-auto hidden h-full w-1 sm:block" />

            {/* Other Links */}
            <div className="hidden items-center sm:flex">
                <OtherLinks horizontal className="h-full" />
            </div>
        </nav>
    );
}
