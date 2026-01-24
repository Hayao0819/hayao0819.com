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
            className={cn(
                "group flex items-center gap-4 p-6 transition-all hover:bg-base-content hover:text-base-100",
                className,
            )}
        >
            <span className="flex h-12 w-12 items-center justify-center border-2 border-current text-xl transition-all group-hover:border-base-100">
                {icon}
            </span>
            <div>
                <p className="text-lg font-bold">{title}</p>
                <p className="text-sm opacity-70">{description}</p>
            </div>
        </Link>
    );
}
