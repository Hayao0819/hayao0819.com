import "@/style/markdown.css";

import clsx from "clsx";
import { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef, useMemo } from "react";

import { ComponentPropsWithoutRefAndClassName } from "@/lib/type";

import { BlogHeading as Heading } from "../Heading";
import { Link } from "../Link";
import Tweet from "../Tweet";

// https://stackoverflow.com/questions/78294682/rehype-slug-is-not-adding-ids-to-headings
export const getComponents = (basepath: string, toc: boolean = false): MDXComponents => {
    return {
        // PropsにidがないとrehypeSlugが動かない

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
                <Link href={href} id={id} className="border-b border-blue-900 text-blue-900">
                    {children}
                </Link>
            );
        },
        p: ({ children, id }) => (
            <p
                // // @ts-expect-error word-breakでauto-phraseを使うための型定義がない
                // style={{ wordBreak: "auto-phrase" }}
                className={clsx({ "py-2": !toc, "leading-none py-1": toc })}
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

            return <img {...props} className="mx-auto w-1/2 py-4" />;
        },
        //code: ({ children }) => <code className="text-sky-600">{children}</code>,

        ul: ({ children, id }) => (
            <ul id={id} className="list-disc pl-8">
                {children}
            </ul>
        ),

        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent bg-gray-200 py-4 pl-8 italic">{children}</blockquote>
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
};

export const useComponents = (basepath: string, toc?: boolean) => {
    return useMemo(() => getComponents(basepath, toc), [basepath, toc]);
};
