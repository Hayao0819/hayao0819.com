import { FaGithub, FaTwitter } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";

export default function Footer() {
    return (
        <footer className="border-foreground/20 bg-background border-t">
            <div className="max-w-shell mx-auto w-full px-6 pt-14 pb-10 sm:px-10">
                <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
                    <div>
                        <p className="font-display text-ink text-2xl leading-tight font-black tracking-tight">Yamada Hayao</p>
                        <p className="text-foreground/75 mt-3 max-w-[36ch] text-sm leading-relaxed">
                            パソコンをカタカタ触るのが趣味の底辺大学生
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-6 md:items-end">
                        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label="Footer">
                            <Link
                                href="/blog/1"
                                className="text-foreground/75 hover:text-accent inline-flex min-h-6 items-center transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/portfolio"
                                className="text-foreground/75 hover:text-accent inline-flex min-h-6 items-center transition-colors"
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/social"
                                className="text-foreground/75 hover:text-accent inline-flex min-h-6 items-center transition-colors"
                            >
                                Social
                            </Link>
                            <Link
                                href="/contact"
                                className="text-foreground/75 hover:text-accent inline-flex min-h-6 items-center transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>
                        <nav className="flex gap-5" aria-label="Social links">
                            <Link
                                href="https://twitter.com/Hayao0819"
                                className="text-foreground/75 hover:text-accent flex h-11 w-11 items-center justify-center transition-colors md:-mr-3"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="text-base" />
                            </Link>
                            <Link
                                href="https://github.com/Hayao0819"
                                className="text-foreground/75 hover:text-accent flex h-11 w-11 items-center justify-center transition-colors md:-mr-3"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-base" />
                            </Link>
                        </nav>
                    </div>
                </div>

                <p className="text-foreground/70 border-foreground/15 mt-12 border-t pt-5 text-xs">
                    &copy; {new Date().getFullYear()} Yamada Hayao
                </p>
            </div>
        </footer>
    );
}
