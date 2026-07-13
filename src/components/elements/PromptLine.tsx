import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PromptLineProps {
    path?: string;
    comment?: string;
    className?: string;
    children: ReactNode;
}

/**
 * Page-level eyebrow as a shell prompt: `path $ cmd ▊`.
 * Section eyebrows keep the `//` comment form — this is the page tier only.
 */
export default function PromptLine({ path = "~", comment, className, children }: PromptLineProps) {
    return (
        // decorative terminal flavor — the page h1 carries the real name
        <p className={cn("mono-eyebrow flex flex-wrap items-baseline gap-x-[1ch] gap-y-1", className)} aria-hidden="true">
            <span>{path}</span>
            <span className="text-accent">$</span>
            <span className="text-foreground/80">{children}</span>
            {comment && <span># {comment}</span>}
            <span
                className="bg-accent animate-term-caret inline-block h-[1.05em] w-[0.55em] self-center align-text-bottom motion-reduce:animate-none"
                aria-hidden="true"
            />
        </p>
    );
}
