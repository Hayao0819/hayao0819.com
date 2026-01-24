"use client";

import { Link } from "@/components/elements/Link";

import { MainManus, OtherLinks } from "./CommonMenu";
import * as Drawer from "./Drawer";

export default function Header() {
    return (
        <nav className="flex items-stretch border-b-4 border-base-content bg-base-100">
            {/* Hamburger Menu */}
            <Drawer.ToggleSwitch />

            {/* Logo */}
            <Link
                className="flex items-center border-r-4 border-base-content bg-base-content px-6 py-3 text-xl font-black tracking-tight text-base-100 transition-all hover:bg-base-content/90"
                href="/"
            >
                <span>Yamada Hayao</span>
            </Link>

            {/* Main Navigation */}
            <div className="hidden grow items-center md:flex">
                <MainManus horizontal className="h-full" />
            </div>

            {/* Separator */}
            <div className="ml-auto hidden h-full w-1 bg-base-content sm:block" />

            {/* Other Links */}
            <div className="hidden items-center sm:flex">
                <OtherLinks horizontal className="h-full" />
            </div>
        </nav>
    );
}
