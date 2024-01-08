"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumbs as DaisyBreadcrumbs } from "react-daisyui";

export default function readcrumbs() {
    const pathName = usePathname()
        ?.split("/")
        .filter((p) => p);
    //console.log(pathName);

    return (
        <DaisyBreadcrumbs>
            {pathName?.map((path, index) => {
                const link = "/" + pathName.slice(0, index + 1).join("/");
                //console.log(link, index);
                return (
                    <DaisyBreadcrumbs.Item key={path}>
                        <Link href={link}>{path}</Link>
                    </DaisyBreadcrumbs.Item>
                );
            })}
        </DaisyBreadcrumbs>
    );
}
