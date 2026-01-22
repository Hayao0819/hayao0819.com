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
                <Link href={href} id={id} className="border-b border-accent text-accent hover:bg-accent hover:text-base-100">
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

            // Use span instead of figure to avoid hydration error when img is inside <p>
            return (
                <span className="my-4 block">
                    <span className="mx-auto block w-fit border-4 border-base-content">
                        <img src={src} alt={props.alt || ""} className="block max-w-full" />
                    </span>
                    {props.alt && (
                        <span className="mt-2 block text-center text-sm text-base-content/70">{props.alt}</span>
                    )}
                </span>
            );
        },
        //code: ({ children }) => <code className="text-sky-600">{children}</code>,

        ul: ({ children, id }) => (
            <ul id={id} className="my-2 border-l-4 border-base-content pl-4">
                {children}
            </ul>
        ),

        ol: ({ children, id }) => (
            <ol id={id} className="my-2 border-l-4 border-base-content pl-4">
                {children}
            </ol>
        ),

        li: ({ children, id }) => (
            <li id={id} className="py-1">
                {children}
            </li>
        ),

        blockquote: ({ children }) => (
            <blockquote className="my-4 border-4 border-base-content">
                <div className="grid grid-cols-[auto_1fr]">
                    <div className="border-r-4 border-base-content bg-base-content p-2 text-xs font-bold text-base-100 [writing-mode:vertical-lr]">
                        Quote
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </blockquote>
        ),

        hr: () => <hr className="my-8 border-t-4 border-base-content" />,

        table: ({ children }) => (
            <div className="my-4 border-4 border-base-content">
                <table className="w-full">{children}</table>
            </div>
        ),

        thead: ({ children }) => (
            <thead className="border-b-4 border-base-content bg-base-content text-base-100">{children}</thead>
        ),

        th: ({ children }) => (
            <th className="border-r border-base-100/30 p-2 text-left last:border-r-0">{children}</th>
        ),

        tr: ({ children }) => <tr className="border-b border-base-content last:border-b-0">{children}</tr>,

        td: ({ children }) => <td className="border-r border-base-content/30 p-2 last:border-r-0">{children}</td>,

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
            <div className="my-8 border-4 border-base-content" id={id}>
                <div className="grid grid-cols-[auto_1fr]">
                    <div className="flex items-center gap-2 border-r-4 border-base-content bg-base-content p-3 font-bold text-base-100 [writing-mode:vertical-lr]">
                        <FaExclamationCircle />
                        <span>Warning</span>
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
        ),
    };
};

export const useComponents = (basepath: string) => {
    return useMemo(() => getComponents(basepath), [basepath]);
};
