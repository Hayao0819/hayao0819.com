import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SkillItemProps {
    icon: ReactNode;
    name: string;
    level?: "main" | "sub";
    className?: string;
}

export function SkillItem({ icon, name, level, className }: SkillItemProps) {
    return (
        <div className={cn("group flex items-baseline gap-3 py-2", className)}>
            <span className={cn("text-xl transition-colors", level === "main" ? "text-foreground" : "text-foreground/70")}>
                {icon}
            </span>
            <span className={cn("text-[14px]", level === "main" ? "font-medium text-foreground" : "text-foreground/70")}>
                {name}
            </span>
        </div>
    );
}
