"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaTwitter } from "react-icons/fa6";

import { IconButton } from "@/components/elements/IconButton";
import { Link } from "@/components/elements/Link";

export default function Footer() {
    const pathName = usePathname();

    if (pathName === "/") {
        return null;
    }

    return (
        <footer className="border-t-4 border-base-content bg-base-100">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-0 md:grid-cols-[1fr_auto]">
                    {/* Author Info */}
                    <div className="border-b-4 border-base-content p-6 md:border-b-0 md:border-r-4">
                        <p className="text-lg font-bold">Yamada Hayao</p>
                        <p className="mt-1 text-sm text-base-content/70">
                            パソコンをカタカタ触るのが趣味の底辺大学生
                        </p>
                    </div>

                    {/* Social Links */}
                    <nav className="flex items-center justify-center gap-3 p-6" aria-label="Social links">
                        <IconButton href="https://twitter.com/Hayao0819" icon={<FaTwitter />} label="Twitter" />
                        <IconButton href="https://github.com/Hayao0819" icon={<FaGithub />} label="GitHub" />
                    </nav>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t-4 border-base-content p-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <Link href="/blog/1" className="hover:underline">
                            Blog
                        </Link>
                        <Link href="/portfolio" className="hover:underline">
                            Portfolio
                        </Link>
                        <Link href="/social" className="hover:underline">
                            Social
                        </Link>
                        <Link href="/contact" className="hover:underline">
                            Contact
                        </Link>
                    </div>
                    <p className="text-sm text-base-content/60">&copy; {new Date().getFullYear()} Yamada Hayao</p>
                </div>
            </div>
        </footer>
    );
}
