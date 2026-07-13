"use client";

import { clsx } from "clsx";
import { default as NextLink } from "next/link";
import { useEffect, useState } from "react";

import Toc, { useHeadingTree } from "@/components/elements/Markdown/Toc";

const BlogToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);
    const [open, setOpen] = useState(true);

    // Collapsed by default on mobile so the first paragraph stays near the fold
    useEffect(() => {
        if (window.matchMedia("(max-width: 767px)").matches) setOpen(false);
    }, []);

    return (
        <details
            className={clsx("group border-foreground/15 border-y py-4 text-[13px] xl:hidden", { hidden: tree.length < 1 })}
            open={open}
            onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
        >
            <summary className="mono-eyebrow flex cursor-pointer list-none items-center gap-2 text-[11px] [&::-webkit-details-marker]:hidden">
                <span>// contents</span>
                <span className="text-foreground/30 transition-transform group-open:rotate-90" aria-hidden="true">
                    &rarr;
                </span>
            </summary>
            <div className="mt-3">
                <Toc contentSelector={contentSelector} />
            </div>
        </details>
    );
};

type HeadingTree = ReturnType<typeof useHeadingTree>;

// Margin index for ≥1280px — same "// contents" voice, all mono, no chrome
export const SideToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <nav aria-label="目次" className={clsx("font-mono-chrome text-[12px]", { hidden: tree.length < 1 })}>
            <p className="mono-eyebrow mb-4">// contents</p>
            <ul className="space-y-2.5">
                {tree.map((h, i) => (
                    <li key={h.id}>
                        <NextLink
                            href={`#${h.id}`}
                            scroll={true}
                            className="text-foreground/70 hover:text-accent group flex items-start gap-2 leading-[1.6] transition-colors"
                        >
                            <span className="text-foreground/65 group-hover:text-accent shrink-0 tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="group-hover:underline" dangerouslySetInnerHTML={{ __html: h.text }} />
                        </NextLink>
                        {h.children.length > 0 && <SideTocChildren items={h.children} />}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const SideTocChildren = ({ items }: { items: HeadingTree[number]["children"] }) => (
    <ul className="border-foreground/15 mt-2 ml-[3px] space-y-1.5 border-l pl-4">
        {items.map((h) => (
            <li key={h.id}>
                <NextLink
                    href={`#${h.id}`}
                    scroll={true}
                    className="text-foreground/65 hover:text-accent block leading-[1.6] transition-colors hover:underline"
                >
                    <span dangerouslySetInnerHTML={{ __html: h.text }} />
                </NextLink>
            </li>
        ))}
    </ul>
);

export default BlogToc;
