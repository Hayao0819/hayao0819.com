import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { VerticalLabel } from "./VerticalLabel";

export interface FramePageProps {
    title: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    rowSpan?: number;
    titleAs?: "h1" | "h2" | "div";
    centered?: boolean;
}

export function FramePage({
    title,
    children,
    className,
    containerClassName,
    labelClassName,
    rowSpan = 1,
    titleAs = "h1",
    centered = false,
}: FramePageProps) {
    return (
        <div
            className={cn(
                "m-auto flex w-fit p-4",
                centered ? "min-h-[calc(100vh-120px)] items-center justify-center" : "items-start justify-center",
                containerClassName,
            )}
        >
            <div className={cn("border-4 border-base-content", className)}>
                <div className="grid grid-cols-[auto_1fr] gap-0">
                    <VerticalLabel
                        as={titleAs}
                        className={cn(rowSpan > 1 && `row-span-${rowSpan}`, "text-2xl font-black", labelClassName)}
                    >
                        {title}
                    </VerticalLabel>
                    <div className="flex flex-col">{children}</div>
                </div>
            </div>
        </div>
    );
}
