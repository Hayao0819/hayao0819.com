import { ReactNode } from "react";

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
                "border-border hover:bg-foreground hover:text-background flex items-center justify-center border-2 transition-all",
                sizeClasses,
                className,
            )}
            aria-label={label}
        >
            {icon}
        </Link>
    );
}
