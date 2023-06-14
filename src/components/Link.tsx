import NextLink from "next/link";
import { Url } from "url";
import { ReactNode } from "react";


interface LinkProps{
    href: string|Url
    children: string
}
export default function Link({href, children}: LinkProps):ReactNode{
    return <NextLink href={href} className="text-blue-600 underline underline-offset-4">{children}</NextLink>
}
