import "@/style/markdown.css";

import { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { FaExclamationCircle } from "react-icons/fa";

import { ComponentPropsWithoutRefAndClassName } from "@/lib/type";

import { BlogHeading as Heading } from "../Heading";
import { Link } from "../Link";
import Tweet from "../Tweet";

// https://stackoverflow.com/questions/78294682/rehype-slug-is-not-adding-ids-to-headings
export const getComponents = (basepath: string): MDXComponents => {
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
                className="py-2"
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

        Warn: ({ children, id }) => (
            <div>
                <div className="my-8 rounded-md bg-red-200 p-4 text-red-900" id={id}>
                    <div className="flex items-center gap-4 font-bold">
                        <FaExclamationCircle />
                        <span>Warning</span>
                    </div>
                    {children}
                </div>
            </div>
        ),
    };
};

export const useComponents = (basepath: string) => {
    return useMemo(() => getComponents(basepath), [basepath]);
};
