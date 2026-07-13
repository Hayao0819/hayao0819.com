import { cn } from "@/lib/utils";

/**
 * The site's two width tiers. Every constrained column measures against
 * these — no page defines its own ad-hoc width.
 *
 * - content (60rem): the page shell, header and footer rows
 * - prose (50rem): article bodies and long-form text columns
 */
export const CONTENT_TIER = "max-w-[60rem]";
export const PROSE_TIER = "max-w-[50rem]";

/**
 * Shared page shell: one horizontal gutter, one width tier, one vertical
 * rhythm (top padding below the header, bottom padding above the footer)
 * for every route. Applied once in the route-group layout.
 */
export default function PageShell({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={cn("mx-auto w-full px-6 pt-12 pb-24 md:px-8 md:pt-16", CONTENT_TIER, className)}>{children}</div>;
}
