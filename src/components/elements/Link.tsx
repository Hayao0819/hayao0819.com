import NextLink from "next/link";
import { JSX, ReactNode } from "react";
import { Url } from "url";

interface LinkProps {
    href: string | Url;
    children: ReactNode;
    legacyBehavior?: boolean
}
export default function Link({ href, children ,legacyBehavior}: LinkProps): JSX.Element {
    return (
        <NextLink href={href} className="text-blue-600 underline underline-offset-4 dark:text-sky-400" legacyBehavior={legacyBehavior}>
            {children}
        </NextLink>
    );
}
