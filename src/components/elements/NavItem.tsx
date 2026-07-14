import type { ReactNode } from "react";

import { Link } from "@/components/elements/Link";
import { cn } from "@/lib/utils";

export interface NavItemProps {
    href: string;
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

export function NavItem({ href, icon, title, description, className }: NavItemProps) {
    return (
        <Link
            href={href}
            className={cn("group flex items-baseline gap-4 border-foreground/15 border-t py-4 transition-colors", className)}
        >
            <span className="mono-eyebrow shrink-0 pt-1 text-[13px] text-foreground/65 group-hover:text-accent">{icon}</span>
            <div className="min-w-0">
                <p className="font-body-prose font-medium text-[16px] text-foreground group-hover:text-accent">{title}</p>
                <p className="mt-1 text-[13px] text-foreground/70">{description}</p>
            </div>
            <span className="ml-auto self-center text-foreground/30 transition-colors group-hover:text-accent" aria-hidden="true">
                &rarr;
            </span>
        </Link>
    );
}
