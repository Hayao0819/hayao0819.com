import { ReactNode } from "react";

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
            className={cn("group border-foreground/15 flex flex-col gap-1 border-t py-4 transition-colors", className)}
        >
            <div className="mono-eyebrow flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11px]">
                <span className="tabular-nums">{date}</span>
                <span className="text-foreground/65">{location}</span>
            </div>
            <p className="font-body-prose text-foreground group-hover:text-accent mt-1 text-[16px] font-medium">{title}</p>
            <p className="text-foreground/70 text-[13px]">{event}</p>
        </Link>
    );
}
