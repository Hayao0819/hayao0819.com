import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PortfolioItemProps {
    icon: ReactNode;
    name: string;
    projects: string[];
    className?: string;
}

export function PortfolioItem({ icon, name, projects, className }: PortfolioItemProps) {
    return (
        <div className={cn("flex items-baseline gap-4 border-foreground/15 border-t py-4", className)}>
            <span className="shrink-0 pt-0.5 text-foreground/70 text-xl">{icon}</span>
            <div className="min-w-0 flex-1">
                <p className="font-body-prose font-medium text-[15px]">{name}</p>
                <div className="mono-eyebrow mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                    {projects.map((project) => (
                        <span key={project} className="text-foreground/65">
                            #{project}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
