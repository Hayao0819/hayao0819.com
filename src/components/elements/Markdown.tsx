import { MDXComponents } from "mdx/types";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

import { BlogHeading as Heading } from "./Heading";

export default async function Markdown({ content }: { content: string }) {
    const components: MDXComponents = {
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
    };

    const mdxSrc = serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeCodeTitles,
                [
                    rehypePrism,
                    {
                        ignoreMissing: true,
                    },
                ],
            ],
        },
        scope: {},
    });

    return (
        <div>
            <MDXRemote {...mdxSrc} source={content} components={components} />
        </div>
    );
}
