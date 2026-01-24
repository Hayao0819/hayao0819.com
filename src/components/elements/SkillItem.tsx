import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SkillItemProps {
    icon: ReactNode;
    name: string;
    level?: "main" | "sub";
    className?: string;
}

export function SkillItem({ icon, name, level, className }: SkillItemProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center border-2 p-4 transition-colors",
                level === "main" ? "border-base-content bg-base-content/5" : "border-base-content/50 hover:border-base-content",
                className,
            )}
        >
            <span className="text-3xl">{icon}</span>
            <span className="mt-2 text-sm font-medium">{name}</span>
        </div>
    );
}
