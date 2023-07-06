import NextLink from "next/link";
import { JSX } from "react";
import { Url } from "url";

interface LinkProps {
    href: string | Url;
    children: string;
}
export default function Link({ href, children }: LinkProps): JSX.Element {
    return (
        <NextLink href={href} className="text-blue-600 underline underline-offset-4 dark:text-sky-400">
            {children}
        </NextLink>
    );
}
