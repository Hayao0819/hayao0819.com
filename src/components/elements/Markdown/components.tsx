import { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef, useMemo } from "react";

import { ComponentPropsWithoutRefAndClassName } from "@/lib/type";

import { BlogHeading as Heading } from "../Heading";
import { Link } from "../Link";
import Tweet from "../Tweet";

// https://stackoverflow.com/questions/78294682/rehype-slug-is-not-adding-ids-to-headings
export const getComponents = (basepath: string): MDXComponents => {
    return {
        // PropsにidがないとrehypeSlugが動かない

        h1: ({ children, id }) => (
            <Heading id={id} level={1}>
                {children}
            </Heading>
        ),
        h2: ({ children, id }) => (
            <Heading id={id} level={2}>
                {children}
            </Heading>
        ),
        h3: ({ children, id }) => (
            <Heading id={id} level={3}>
                {children}
            </Heading>
        ),
        h4: ({ children, id }) => (
            <Heading id={id} level={4}>
                {children}
            </Heading>
        ),
        h5: ({ children, id }) => (
            <Heading id={id} level={5}>
                {children}
            </Heading>
        ),
        a: ({ href, children, id }) => {
            if (!href) return <span>{children}</span>;
            return (
                <Link href={href} id={id} className="link-ai">
                    {children}
                </Link>
            );
        },
        p: ({ children, id }) => <p id={id}>{children}</p>,

        Tweet: Tweet,
        img: (props) => {
            let src = props.src;
            if (!src?.startsWith("http")) {
                // basepath ends with a slash — collapse duplicates for canonical URLs
                src = (basepath + "/" + src).replaceAll(/\/{2,}/g, "/");
            }

            // Use span instead of figure to avoid hydration error when img is inside <p>
            return (
                <span className="my-7 block">
                    <img src={src} alt={props.alt || ""} className="mx-auto block max-w-full" />
                    {props.alt && <span className="mono-eyebrow mt-3 block text-center text-[11px]">{props.alt}</span>}
                </span>
            );
        },
        code: ({ children, className, ...rest }) => {
            // Code blocks have data-language attribute from rehype-pretty-code
            const isCodeBlock = className || "data-language" in rest || "data-theme" in rest;
            if (isCodeBlock) {
                return <code className={className}>{children}</code>;
            }
            // Inline code — mono, quiet paper-shifted chip, ink text
            return (
                <code className="bg-foreground/[0.07] text-foreground/90 mx-0.5 px-[0.4em] py-[0.15em] font-mono text-[0.9em]">
                    {children}
                </code>
            );
        },

        ul: ({ children, id }) => (
            <ul id={id} className="my-3 list-none pl-1">
                {children}
            </ul>
        ),
        ol: ({ children, id }) => (
            <ol id={id} className="marker:text-foreground/65 my-3 list-decimal pl-6 marker:font-mono marker:text-[0.85em]">
                {children}
            </ol>
        ),
        li: ({ children, id }) => (
            <li
                id={id}
                className="before:text-foreground/40 my-1 pl-5 -indent-5 before:mr-3 before:font-mono before:content-['—'] [&>ol]:mt-1 [&>ul]:mt-1"
            >
                {children}
            </li>
        ),

        blockquote: ({ children }) => (
            <blockquote className="border-foreground/25 text-foreground/70 my-7 border-l pl-5 not-italic">{children}</blockquote>
        ),

        hr: () => <hr className="border-foreground/25 my-10 border-t" />,

        table: ({ children }) => (
            // Same treatment as <pre>: a focusable, named scroll region so
            // keyboard users can scroll wide tables
            <div className="my-7 overflow-x-auto" tabIndex={0} role="region" aria-label="table">
                <table className="w-full border-collapse text-[14px]">{children}</table>
            </div>
        ),
        thead: ({ children }) => <thead className="border-foreground/30 border-b">{children}</thead>,
        th: ({ children }) => <th className="mono-eyebrow px-3 py-2 text-left text-[11px]">{children}</th>,
        tr: ({ children }) => <tr className="border-foreground/10 border-b last:border-b-0">{children}</tr>,
        td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,

        Flex: ({ children, id, ...props }: ComponentPropsWithoutRefAndClassName<"div">) => (
            <div id={id} {...props} className="mx-auto flex flex-wrap justify-center">
                {children}
            </div>
        ),
        Grid: ({ children, col, id, ...props }: Omit<ComponentPropsWithoutRef<"div">, "className"> & { col: number }) => (
            <div
                className="mx-auto grid justify-center"
                id={id}
                style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}
                {...props}
            >
                {children}
            </div>
        ),

        Warn: ({ children, id }) => (
            <div className="border-foreground/50 bg-foreground/[0.04] my-7 border-l-2 py-4 pr-5 pl-5" id={id}>
                <p className="mono-eyebrow mb-2 text-[11px]">// warning</p>
                <div className="text-foreground/85">{children}</div>
            </div>
        ),
    };
};

export const useComponents = (basepath: string) => {
    return useMemo(() => getComponents(basepath), [basepath]);
};
