import type { ReactNode } from "react";

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
                "relative z-0 flex items-center justify-center gap-3 overflow-hidden p-6 transition-[color] delay-[80ms] duration-[140ms] ease-linear before:absolute before:inset-0 before:-z-10 before:-translate-x-[101%] before:bg-foreground before:transition-transform before:duration-200 before:ease-[cubic-bezier(.2,.7,.2,1)] before:content-[''] hover:bg-transparent hover:text-background hover:before:translate-x-0 motion-reduce:before:transition-none",
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
