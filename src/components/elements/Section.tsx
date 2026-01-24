import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
    isLast?: boolean;
    className?: string;
    padding?: "sm" | "md" | "lg";
}

export function Section({ title, description, children, isLast, className, padding = "lg" }: SectionProps) {
    const paddingClass = {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
    }[padding];

    return (
        <div className={cn(paddingClass, !isLast && "border-b-4 border-base-content", className)}>
            {title && (
                <div className="mb-4">
                    <p className="text-lg font-bold">{title}</p>
                    {description && <p className="text-xs text-base-content/60">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
}
