import { ReactNode } from "react";

import { Link } from "@/components/elements/Link";
import { cn } from "@/lib/utils";

export interface SocialLinkProps {
    href: string;
    icon: ReactNode;
    name: string;
    handle?: string;
    className?: string;
}

export function SocialLink({ href, icon, name, handle, className }: SocialLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center justify-center gap-3 p-6 transition-all hover:bg-base-content hover:text-base-100",
                className,
            )}
        >
            <span className="text-4xl">{icon}</span>
            <div className="flex flex-col">
                <p className="font-medium">{name}</p>
                {handle && <p className="text-xs opacity-60">{handle}</p>}
            </div>
        </Link>
    );
}
