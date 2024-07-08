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
            <ul className="">
                {pathNameToShow?.map((path, index) => {
                    const link = "/" + pathNameBase?.join("/") + "/" + pathNameToShow?.slice(0, index + 1).join("/");
                    //console.log(link, index);
                    return (
                        <li key={path}>
                            <Link href={link} className=" text-gray-600">
                                {path}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
