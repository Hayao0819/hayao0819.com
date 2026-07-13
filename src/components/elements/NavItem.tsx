import { ReactNode } from "react";

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
            className={cn("group border-foreground/15 flex items-baseline gap-4 border-t py-4 transition-colors", className)}
        >
            <span className="mono-eyebrow text-foreground/65 group-hover:text-accent shrink-0 pt-1 text-[13px]">{icon}</span>
            <div className="min-w-0">
                <p className="font-body-prose text-foreground group-hover:text-accent text-[16px] font-medium">{title}</p>
                <p className="text-foreground/70 mt-1 text-[13px]">{description}</p>
            </div>
            <span className="text-foreground/30 group-hover:text-accent ml-auto self-center transition-colors" aria-hidden="true">
                &rarr;
            </span>
        </Link>
    );
}
