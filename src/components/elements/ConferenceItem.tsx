import type { ReactNode } from "react";

import { Link } from "@/components/elements/Link";
import { cn } from "@/lib/utils";

export interface ConferenceItemProps {
    title: string;
    event: string;
    date: string;
    location: string;
    href: string;
    icon?: ReactNode;
    className?: string;
}

export function ConferenceItem({ title, event, date, location, href, className }: ConferenceItemProps) {
    return (
        <Link
            href={href}
            className={cn("group flex flex-col gap-1 border-foreground/15 border-t py-4 transition-colors", className)}
        >
            <div className="mono-eyebrow flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11px]">
                <span className="tabular-nums">{date}</span>
                <span className="text-foreground/65">{location}</span>
            </div>
            <p className="mt-1 font-body-prose font-medium text-[16px] text-foreground group-hover:text-accent">{title}</p>
            <p className="text-[13px] text-foreground/70">{event}</p>
        </Link>
    );
}
