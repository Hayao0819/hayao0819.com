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

export function Section({ title, description, children, isLast: _isLast, className, padding = "lg" }: SectionProps) {
    const paddingClass = {
        sm: "py-4",
        md: "py-6",
        lg: "py-8",
    }[padding];

    return (
        <section className={cn(paddingClass, className)}>
            {title && (
                <div className="mb-5">
                    <p className="mono-eyebrow text-[11px]">// {title.toLowerCase()}</p>
                    {description && <p className="text-foreground/70 mt-2 text-[13px]">{description}</p>}
                </div>
            )}
            {children}
        </section>
    );
}
