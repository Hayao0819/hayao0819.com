import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

/**
 * The one page shell. Every route renders inside this: same shell width,
 * same gutters, same rhythm below the header and above the footer.
 */
export function PageContainer({ children, className }: PageContainerProps) {
    return (
        <div className={cn("max-w-shell mx-auto w-full px-6 pt-12 pb-24 sm:px-10 md:pt-24 md:pb-32", className)}>{children}</div>
    );
}
