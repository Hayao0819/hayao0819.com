"use client";

import { clsx } from "clsx";
import { default as NextLink } from "next/link";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import Toc, { useHeadingTree } from "@/components/elements/Markdown/Toc";

const BlogToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <aside
            className={clsx("border-foreground/15 border-b xl:hidden", { hidden: tree.length < 1 })}
            aria-label="Table of contents"
        >
            {/* Mobile — collapsed disclosure so the prose starts within the first screen */}
            <details className="group py-4 md:hidden">
                <summary className="font-display flex cursor-pointer list-none items-center justify-between text-base font-bold [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3">
                        <span className="bg-accent h-[2px] w-5 shrink-0" aria-hidden />
                        Contents
                    </span>
                    <FaChevronDown
                        className="text-foreground/75 text-xs transition-transform group-open:rotate-180"
                        aria-hidden
                    />
                </summary>
                <div className="mt-4 pb-2">
                    <Toc contentSelector={contentSelector} />
                </div>
            </details>

            {/* Tablet — full contents, always visible (the sticky rail takes over at xl) */}
            <div className="hidden py-6 md:block">
                <p className="font-display mb-4 flex items-center gap-3 text-base font-bold">
                    <span className="bg-accent h-[2px] w-5 shrink-0" aria-hidden />
                    Contents
                </p>
                <Toc contentSelector={contentSelector} />
            </div>
        </aside>
    );
};

const useActiveHeading = (contentSelector: string) => {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const content = document.querySelector(contentSelector);
        if (!content) return;
        const headings = Array.from(content.querySelectorAll("h2, h3"));

        const onScroll = () => {
            let current = "";
            for (const h of headings) {
                if (h.getBoundingClientRect().top <= 120) current = h.id;
            }
            setActiveId(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [contentSelector]);

    return activeId;
};

/** Sticky margin contents for wide viewports — numbered like the magazine index, current entry in indigo. */
export const SideToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);
    const activeId = useActiveHeading(contentSelector);

    if (tree.length < 1) return null;

    return (
        <nav className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto" aria-label="Table of contents">
            <p className="font-display mb-5 flex items-center gap-3 text-sm font-bold">
                <span className="bg-accent h-[2px] w-5 shrink-0" aria-hidden />
                Contents
            </p>
            <ol className="border-foreground/15 flex list-none flex-col gap-3 border-l pl-5">
                {tree.map((e, index) => {
                    const active = activeId === e.id || e.children.some((c) => c.id === activeId);
                    return (
                        <li key={e.id} className="relative leading-snug">
                            {active && <span className="bg-accent absolute top-0 -left-[21px] h-full w-[2px]" aria-hidden />}
                            <NextLink
                                href={`#${e.id}`}
                                scroll={true}
                                aria-current={activeId === e.id ? "true" : undefined}
                                className={clsx(
                                    "hover:text-accent flex items-baseline gap-2.5 text-sm transition-colors duration-150",
                                    activeId === e.id ? "text-accent font-semibold" : "text-foreground/75",
                                )}
                            >
                                <span
                                    className="text-accent shrink-0 text-[10px] font-semibold tracking-[0.1em] tabular-nums"
                                    aria-hidden
                                >
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>
                                <span className="font-display min-w-0" dangerouslySetInnerHTML={{ __html: e.text }} />
                            </NextLink>
                            {e.children.length > 0 && (
                                <ol className="mt-2 flex list-none flex-col gap-1.5 pl-6">
                                    {e.children.map((c) => (
                                        <li key={c.id} className="leading-snug">
                                            <NextLink
                                                href={`#${c.id}`}
                                                scroll={true}
                                                aria-current={activeId === c.id ? "true" : undefined}
                                                className={clsx(
                                                    "hover:text-accent block text-xs transition-colors duration-150",
                                                    activeId === c.id ? "text-accent font-semibold" : "text-foreground/70",
                                                )}
                                                dangerouslySetInnerHTML={{ __html: c.text }}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BlogToc;
