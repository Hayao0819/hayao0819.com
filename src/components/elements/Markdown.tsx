"use client";

import ReactMD, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { BlogHeading as Heading } from "./Heading";
import Link from "./Link";

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
            if (!href) return <></>;
            return <Link href={href}>{children}</Link>;
        },
        pre: ({ children }) => {
            return <pre className="!overflow-x-scroll">{children}</pre>;
        },
        code: ({ children }) => {
            return <code>{children}</code>;
        },
    };

    return (
        <ReactMD remarkPlugins={[remarkGfm]} components={components}>
            {content}
        </ReactMD>
    );
}
