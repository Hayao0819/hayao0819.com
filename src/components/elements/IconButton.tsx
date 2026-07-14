import type { ReactNode } from "react";

import { Link } from "@/components/elements/Link";
import { cn } from "@/lib/utils";

export interface IconButtonProps {
    href: string;
    icon: ReactNode;
    label?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function IconButton({ href, icon, label, size = "md", className }: IconButtonProps) {
    const sizeClasses = {
        sm: "h-10 w-10 text-lg",
        md: "h-12 w-12 text-xl",
        lg: "h-14 w-14 text-2xl",
    }[size];

    return (
        <Link
            href={href}
            className={cn(
                "relative z-0 flex items-center justify-center overflow-hidden border-2 border-border transition-[color] delay-[60ms] duration-[120ms] ease-linear before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:bg-foreground before:transition-transform before:duration-[180ms] before:ease-[cubic-bezier(.2,.7,.2,1)] before:content-[''] hover:bg-transparent hover:text-background hover:before:translate-y-0 motion-reduce:before:transition-none",
                sizeClasses,
                className,
            )}
            aria-label={label}
        >
            {icon}
        </Link>
    );
}
