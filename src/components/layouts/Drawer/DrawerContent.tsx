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
            <div className="border-b-4 border-base-content bg-base-content p-6 text-base-100">
                <h2 className="text-2xl font-black tracking-tight">Yamada Hayao</h2>
                <p className="mt-2 text-sm text-base-100/70">Web Developer / Security Enthusiast</p>
                <div className="mt-4 flex gap-3">
                    <Link
                        href="https://twitter.com/Hayao0819"
                        className="flex h-10 w-10 items-center justify-center border-2 border-base-100/30 transition-all hover:border-base-100 hover:bg-base-100 hover:text-base-content"
                    >
                        <FaTwitter className="text-lg" />
                    </Link>
                    <Link
                        href="https://github.com/Hayao0819"
                        className="flex h-10 w-10 items-center justify-center border-2 border-base-100/30 transition-all hover:border-base-100 hover:bg-base-100 hover:text-base-content"
                    >
                        <FaGithub className="text-lg" />
                    </Link>
                    <Link
                        href="https://instagram.com/Hayao0819"
                        className="flex h-10 w-10 items-center justify-center border-2 border-base-100/30 transition-all hover:border-base-100 hover:bg-base-100 hover:text-base-content"
                    >
                        <FaInstagram className="text-lg" />
                    </Link>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="border-b-4 border-base-content">
                <div className="px-2 py-4">
                    <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-base-content/50">Navigation</p>
                    <MainManus onMenuItemClick={toggleDrawer} />
                </div>
            </div>

            {/* Other Links */}
            <div className="border-b-4 border-base-content">
                <div className="px-2 py-4">
                    <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-base-content/50">Other</p>
                    <OtherLinks onMenuItemClick={toggleDrawer} className="border-l-0" />
                </div>
            </div>

            {/* Quick Links */}
            <div className="flex-1 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-base-content/50">Quick Links</p>
                <div className="flex flex-col gap-2">
                    <Link href="/blog/1" onClick={toggleDrawer} className="group flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 bg-base-content/30 transition-all group-hover:bg-base-content" />
                        <span className="group-hover:underline">Blog</span>
                    </Link>
                    <Link href="/portfolio" onClick={toggleDrawer} className="group flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 bg-base-content/30 transition-all group-hover:bg-base-content" />
                        <span className="group-hover:underline">Portfolio</span>
                    </Link>
                    <Link href="/contact" onClick={toggleDrawer} className="group flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 bg-base-content/30 transition-all group-hover:bg-base-content" />
                        <span className="group-hover:underline">Contact</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t-4 border-base-content p-4">
                <p className="text-center text-xs text-base-content/50">&copy; 2024 Yamada Hayao</p>
            </div>
        </div>
    );
}
