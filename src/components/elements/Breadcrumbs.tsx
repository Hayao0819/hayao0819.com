"use client";

import classNames from "clsx";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { Link } from "@/components/elements/Link";

export default function Breadcrumbs({ className, start = 0 }: { className?: string; start?: number }) {
    const pathName = usePathname()
        ?.split("/")
        .filter((p) => p);
    const pathNameToShow = pathName?.slice(start);
    const pathNameBase = pathName?.slice(0, start);

    return (
        <nav className={classNames("flex flex-wrap items-baseline gap-x-2 text-xs", className)} aria-label="Breadcrumb">
            {pathNameToShow?.map((path, index) => {
                const link = "/" + pathNameBase?.join("/") + "/" + pathNameToShow?.slice(0, index + 1).join("/");
                return (
                    <Fragment key={path}>
                        {index > 0 && (
                            <span className="text-foreground/25" aria-hidden>
                                /
                            </span>
                        )}
                        <Link href={link} className="text-foreground/50 hover:text-foreground transition-colors">
                            {path}
                        </Link>
                    </Fragment>
                );
            })}
        </nav>
    );
}
