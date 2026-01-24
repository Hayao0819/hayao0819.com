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

export function ConferenceItem({ title, event, date, location, href, icon, className }: ConferenceItemProps) {
    return (
        <Link
            href={href}
            className={cn("flex items-start gap-4 p-5 transition-all hover:bg-base-content hover:text-base-100", className)}
        >
            {icon && <span className="mt-1 text-2xl">{icon}</span>}
            <div className="flex flex-col gap-1">
                <p className="text-lg font-bold">{title}</p>
                <p className="text-sm font-medium">{event}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 text-xs opacity-70">
                    <span>{date}</span>
                    <span>{location}</span>
                </div>
            </div>
        </Link>
    );
}
