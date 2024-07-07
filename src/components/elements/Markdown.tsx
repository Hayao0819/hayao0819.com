import "@/style/markdown.css";

import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import { ComponentPropsWithoutRef } from "react";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

import { ComponentPropsWithoutRefAndClassName } from "@/lib/type";

import { BlogHeading as Heading } from "./Heading";
import Tweet from "./Tweet";

export default async function Markdown({ content, basepath }: { content: string; basepath: string }) {
    // PropsにidがないとrehypeSlugが動かない
    // https://stackoverflow.com/questions/78294682/rehype-slug-is-not-adding-ids-to-headings
    const components: MDXComponents = {
        h1: ({ children, id }) => {
            return (
                <Heading id={id} level={1}>
                    {children}
                </Heading>
            );
        },

        h2: ({ children, id }) => {
            return (
                <Heading id={id} level={2}>
                    {children}
                </Heading>
            );
        },
        h3: ({ children, id }) => {
            return (
                <Heading id={id} level={3}>
                    {children}
                </Heading>
            );
        },
        h4: ({ children, id }) => {
            return (
                <Heading id={id} level={4}>
                    {children}
                </Heading>
            );
        },
        h5: ({ children, id }) => {
            return (
                <Heading id={id} level={5}>
                    {children}
                </Heading>
            );
        },
        a: ({ href, children, id }) => {
            if (!href) return <span>{children}</span>;
            return (
                <Link href={href} id={id} className=" text-blue-900">
                    {children}
                </Link>
            );
        },
        p: ({ children, id }) => (
            <p
                // // @ts-expect-error word-breakでauto-phraseを使うための型定義がない
                // style={{ wordBreak: "auto-phrase" }}
                className="py-2 leading-6"
                id={id}
            >
                {children}
            </p>
        ),

        Tweet: Tweet,
        img: (props) => {
            let src = props.src;
            if (!src?.startsWith("http")) {
                src = basepath + "/" + src;
            }
            props = { ...props, src };

            return <img {...props} className="py-4" />;
        },
        //code: ({ children }) => <code className="text-sky-600">{children}</code>,

        ul: ({ children, id }) => (
            <ul id={id} className="list-disc pl-8">
                {children}
            </ul>
        ),

        //pre: ({ children, className }) => <pre className={classNames(className, "p-2")}>{children}</pre>,

        Flex: ({ children, id, ...props }: ComponentPropsWithoutRefAndClassName<"div">) => {
            return (
                <div id={id} {...props} className="mx-auto flex flex-wrap justify-center">
                    {children}
                </div>
            );
        },

        Grid: ({ children, col, id, ...props }: Omit<ComponentPropsWithoutRef<"div">, "className"> & { col: number }) => {
            return (
                <div
                    className="mx-auto grid justify-center"
                    id={id}
                    style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}
                    {...props}
                >
                    {children}
                </div>
            );
        },
    };

    return (
        <div>
            <MDXRemote
                source={content}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                            [
                                rehypeSlug,
                                {
                                    prefix: "",
                                },
                            ],
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
