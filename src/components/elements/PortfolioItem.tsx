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
        <div className={cn("flex items-start gap-4 border-2 border-base-content p-4", className)}>
            <span className="text-3xl">{icon}</span>
            <div className="min-w-0 flex-1">
                <p className="font-bold">{name}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                    {projects.map((project) => (
                        <span key={project} className="border border-base-content/40 px-2 py-0.5 text-xs text-base-content/70">
                            {project}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
