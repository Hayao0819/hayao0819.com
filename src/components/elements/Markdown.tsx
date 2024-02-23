import { MDXRemote } from "@daviereid/next-mdx-remote/rsc";
import { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ReactNode } from "react";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism";
import remarkGfm from "remark-gfm";

import { BlogHeading as Heading } from "./Heading";
import Tweet from "./Tweet";

export default async function Markdown({ content, basepath }: { content: string; basepath: string }) {
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
        p: ({ children }) => {
            // @ts-expect-error word-breakでauto-phraseを使うための型定義がない
            return <p style={{ wordBreak: "auto-phrase" }}>{children}</p>;
        },
        Tweet: ({ id }: { id: string }) => {
            return <Tweet id={id} />;
        },
        img: (props) => {
            let src = props.src;
            if (!src?.startsWith("http")) {
                src = basepath + "/" + src;
            }
            props = { ...props, src };

            return <img {...props} className="" />;
        },

        Flex: ({ children }: { children: ReactNode }) => {
            return <div className="mx-auto flex flex-wrap justify-center">{children}</div>;
        },

        Grid: ({ children, col }: { children: ReactNode; col: number }) => {
            return (
                <div
                    className="mx-auto grid justify-center gap-8"
                    style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}
                >
                    {children}
                </div>
            );
        },
    };

    /* だるいエラーについて

    https://github.com/hashicorp/next-mdx-remote/issues/403

    現在next-mdx-remoteはremarkGfm 4.0.0をサポートしていないため、3.0.1を使う必要がある
    
    */

    return (
        <div>
            <MDXRemote
                source={content}
                options={{
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
                }}
                components={components}
            />
        </div>
    );
}
