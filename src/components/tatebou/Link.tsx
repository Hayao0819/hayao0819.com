import NextLink from "next/link";
import { JSX, ReactNode } from "react";
import { Url } from "url";

interface LinkProps {
    href: string | Url;
    children: ReactNode;
    newtab?: boolean;
}
export default function Link({ href, children, newtab }: LinkProps): JSX.Element {
    const className = "text-blue-800 underline underline-offset-4 dark:text-sky-600";
    if (newtab) {
        return (
            <a href={href.toString()} target="_blank" className={className} rel="noreferrer">
                {children}
            </a>
        );
    } else {
        return (
            <NextLink href={href} className={className}>
                {children}
            </NextLink>
        );
    }
}
