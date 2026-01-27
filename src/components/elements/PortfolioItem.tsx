import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PortfolioItemProps {
    icon: ReactNode;
    name: string;
    projects: string[];
    className?: string;
}

export function PortfolioItem({ icon, name, projects, className }: PortfolioItemProps) {
    return (
        <div className={cn("border-border flex items-start gap-4 border-2 p-4", className)}>
            <span className="text-3xl">{icon}</span>
            <div className="min-w-0 flex-1">
                <p className="font-bold">{name}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                    {projects.map((project) => (
                        <span key={project} className="border-border/40 text-foreground/70 border px-2 py-0.5 text-xs">
                            {project}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
