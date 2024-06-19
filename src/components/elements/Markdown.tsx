import "@/style/markdown.css";

import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import { ReactNode } from "react";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
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
                <Link href={href} className=" text-blue-900">
                    {children}
                </Link>
            );
        },
        p: ({ children }) => (
            <p
                // // @ts-expect-error word-breakでauto-phraseを使うための型定義がない
                // style={{ wordBreak: "auto-phrase" }}
                className="py-2 leading-6"
            >
                {children}
            </p>
        ),

        Tweet: ({ id }: { id: string }) => {
            return <Tweet id={id} />;
        },
        img: (props) => {
            let src = props.src;
            if (!src?.startsWith("http")) {
                src = basepath + "/" + src;
            }
            props = { ...props, src };

            return <img {...props} className="py-4" />;
        },
        //code: ({ children }) => <code className="text-sky-600">{children}</code>,

        ul: ({ children }) => <ul className="list-disc pl-8">{children}</ul>,

        //pre: ({ children, className }) => <pre className={classNames(className, "p-2")}>{children}</pre>,

        Flex: ({ children }: { children: ReactNode }) => {
            return <div className="mx-auto flex flex-wrap justify-center">{children}</div>;
        },

        Grid: ({ children, col }: { children: ReactNode; col: number }) => {
            return (
                <div className="mx-auto grid justify-center" style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}>
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
                                rehypePrettyCode,
                                {
                                    theme: "one-dark-pro",
                                    keepBackground: true,
                                    defaultLang: "plaintext",
                                },
                            ],
                            rehypeStringify,
                        ],
                    },
                }}
                components={components}
            />
        </div>
    );
}
