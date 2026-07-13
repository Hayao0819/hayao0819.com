"use client";

import classNames from "clsx";
import { usePathname } from "next/navigation";

import { Link } from "@/components/elements/Link";

export default function Breadcrumbs({ className, start = 0 }: { className?: string; start?: number }) {
    const pathName = usePathname()
        ?.split("/")
        .filter((p) => p);
    const pathNameToShow = pathName?.slice(start);
    const pathNameBase = pathName?.slice(0, start);

    return (
        <div className={classNames("breadcrumbs", className)}>
            <ul className="flex flex-wrap items-baseline gap-y-0.5">
                {pathNameToShow?.map((path, index) => {
                    const link = "/" + pathNameBase?.join("/") + "/" + pathNameToShow?.slice(0, index + 1).join("/");
                    return (
                        <li key={path} className="inline-flex items-baseline">
                            <span className="text-foreground/30" aria-hidden="true">
                                /
                            </span>
                            <Link href={link} className="text-foreground/70 hover:text-foreground">
                                {path}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
