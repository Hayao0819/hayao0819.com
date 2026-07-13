import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PageMastheadProps {
    /** Tiny tracked-caps kicker above the title. Factual labels only. */
    kicker?: ReactNode;
    /** Main display headline. */
    title: ReactNode;
    /** Dek below the headline. */
    lede?: ReactNode;
    /** Container className override. */
    className?: string;
}

/**
 * Section-front masthead: kicker – headline – dek, closed by a single hairline.
 * Newspaper-ness lives in the scale contrast, not in rules or boxes.
 */
export function PageMasthead({ kicker, title, lede, className }: PageMastheadProps) {
    return (
        <header className={cn("border-foreground/20 mb-12 border-b pb-8 md:mb-16 md:pb-10", className)}>
            {kicker && <p className="tracked-caps text-accent mb-4 text-[11px]">{kicker}</p>}
            <h1 className="font-display break-phrase text-ink text-3xl leading-[1.08] font-black tracking-tight md:text-4xl lg:text-5xl">
                {title}
            </h1>
            {lede && <p className="font-serif-jp text-foreground/75 mt-5 max-w-[42em] text-base leading-[1.9]">{lede}</p>}
        </header>
    );
}
