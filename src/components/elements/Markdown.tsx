"use client";

import Link from "next/link";
import ReactMD, { Components } from "react-markdown";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

import { BlogHeading as Heading } from "./Heading";

export default function Markdown({ content }: { content: string }) {
    const components: Partial<Components> = {
        h1: ({ children }) => {
            return <Heading level={1}>{children}</Heading>;
        },

        h2: ({ children }) => {
            return <Heading level={2}>{children}</Heading>;
        },
        h3: ({ children }) => {
            return <Heading level={3}>{children}</Heading>;
        },
        h4: ({ children }) => {
            return <Heading level={4}>{children}</Heading>;
        },
        h5: ({ children }) => {
            return <Heading level={5}>{children}</Heading>;
        },
        a: ({ href, children }) => {
            if (!href) return <span>{children}</span>;
            return (
                <Link href={href} className=" underline underline-offset-4">
                    {children}
                </Link>
            );
        },
        /*
        pre: ({ children }) => {
            return <pre className="!overflow-x-scroll">{children}</pre>;
        },
        code: ({ children }) => {
            return <code>{children}</code>;
        },
        */
    };

    return (
        <ReactMD remarkPlugins={[[remarkGfm, {}]]} rehypePlugins={[rehypeCodeTitles, rehypePrism]} components={components}>
            {content}
        </ReactMD>
    );
}
