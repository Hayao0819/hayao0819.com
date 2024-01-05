"use client";

import classNames from "classnames";
import { default as NextLink } from "next/link";

export default function Link(props: { children: React.ReactNode; href: string }) {
    const cn = classNames("link");

    return <NextLink {...props} className={cn} />;
}
