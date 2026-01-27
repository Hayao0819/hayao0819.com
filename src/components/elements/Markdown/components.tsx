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
                <Link
                    href={href}
                    id={id}
                    className="text-accent after:bg-accent relative transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-all hover:after:h-1"
                >
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
                    <span className="border-border mx-auto block w-fit border-4">
                        <img src={src} alt={props.alt || ""} className="block max-w-full" />
                    </span>
                    {props.alt && <span className="text-foreground/70 mt-2 block text-center text-sm">{props.alt}</span>}
                </span>
            );
        },
        code: ({ children, className }) => {
            // If it has a className, it's a code block (handled by shiki), not inline code
            if (className) {
                return <code className={className}>{children}</code>;
            }
            // Inline code style
            return (
                <code className="border-border/30 bg-foreground/5 text-accent mx-0.5 border px-1.5 py-0.5 font-mono text-[0.9em]">
                    {children}
                </code>
            );
        },

        ul: ({ children, id }) => (
            <ul id={id} className="border-border my-2 border-l-4 pl-4">
                {children}
            </ul>
        ),

        ol: ({ children, id }) => (
            <ol id={id} className="border-border my-2 border-l-4 pl-4">
                {children}
            </ol>
        ),

        li: ({ children, id }) => (
            <li id={id} className="py-1">
                {children}
            </li>
        ),

        blockquote: ({ children }) => (
            <blockquote className="border-border my-4 border-4">
                <div className="grid grid-cols-[auto_1fr]">
                    <div className="border-border bg-foreground text-background border-r-4 p-2 text-xs font-bold [writing-mode:vertical-lr]">
                        Quote
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </blockquote>
        ),

        hr: () => <hr className="border-border my-8 border-t-4" />,

        table: ({ children }) => (
            <div className="border-border my-4 border-4">
                <table className="w-full">{children}</table>
            </div>
        ),

        thead: ({ children }) => <thead className="border-border bg-foreground text-background border-b-4">{children}</thead>,

        th: ({ children }) => <th className="border-background/30 border-r p-2 text-left last:border-r-0">{children}</th>,

        tr: ({ children }) => <tr className="border-border border-b last:border-b-0">{children}</tr>,

        td: ({ children }) => <td className="border-border/30 border-r p-2 last:border-r-0">{children}</td>,

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
            <div className="border-border my-8 border-4" id={id}>
                <div className="grid grid-cols-[auto_1fr]">
                    <div className="border-border bg-foreground text-background flex items-center gap-2 border-r-4 p-3 font-bold [writing-mode:vertical-lr]">
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
