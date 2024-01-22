"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs({ className }: { className?: string }) {
    const pathName = usePathname()
        ?.split("/")
        .filter((p) => p);
    //console.log(pathName);

    return (
        <div className={classNames("breadcrumbs", className)}>
            <ul className="">
                {pathName?.map((path, index) => {
                    const link = "/" + pathName.slice(0, index + 1).join("/");
                    //console.log(link, index);
                    return (
                        <li key={path}>
                            <Link href={link}>{path}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
