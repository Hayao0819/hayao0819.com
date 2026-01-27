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
                "border-border hidden border-r-4 p-4 [writing-mode:vertical-lr] md:block",
                inverted && "bg-foreground text-background",
                className,
            )}
        >
            {children}
        </Component>
    );
}
