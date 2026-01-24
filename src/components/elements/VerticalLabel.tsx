import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface VerticalLabelProps {
    children: ReactNode;
    className?: string;
    inverted?: boolean;
    as?: "h1" | "h2" | "div" | "span";
}

export function VerticalLabel({ children, className, inverted = true, as: Component = "div" }: VerticalLabelProps) {
    return (
        <Component
            className={cn(
                "border-r-4 border-base-content p-4 [writing-mode:vertical-lr]",
                inverted && "bg-base-content text-base-100",
                className,
            )}
        >
            {children}
        </Component>
    );
}
