import { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { FaExclamationCircle } from "react-icons/fa";

import { ComponentPropsWithoutRefAndClassName } from "@/lib/type";

import GistEmbed from "../GistEmbed";
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
                    className="text-accent decoration-accent/40 hover:decoration-accent underline decoration-1 underline-offset-4 transition-colors duration-150"
                >
                    {children}
                </Link>
            );
        },
        // No italic JP face exists — emphasise by weight instead of synthesized oblique
        em: ({ children, id }) => (
            <em id={id} className="text-foreground font-semibold not-italic">
                {children}
            </em>
        ),

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
        Gist: GistEmbed,
        img: (props) => {
            let src = props.src;
            if (!src?.startsWith("http")) {
                src = basepath + "/" + src;
            }

            // Use span instead of figure to avoid hydration error when img is inside <p>
            return (
                <span className="my-8 block">
                    <span className="border-foreground/15 mx-auto block w-fit border">
                        <img src={src} alt={props.alt || ""} className="block max-w-full" />
                    </span>
                    {props.alt && (
                        <span className="font-display text-foreground/75 mt-3 block text-center text-sm">{props.alt}</span>
                    )}
                </span>
            );
        },
        code: ({ children, className, ...rest }) => {
            // Code blocks have data-language attribute from rehype-pretty-code, or className from other highlighters
            // Check for data-language or className to identify code blocks
            const isCodeBlock = className || "data-language" in rest || "data-theme" in rest;
            if (isCodeBlock) {
                return <code className={className}>{children}</code>;
            }
            // Inline code style — break-all is fine here since the content is code, not prose
            return (
                <code className="bg-foreground/5 text-accent mx-0.5 px-1.5 py-0.5 font-mono text-[0.9em] break-all">
                    {children}
                </code>
            );
        },

        ul: ({ children, id }) => (
            <ul id={id} className="marker:text-foreground/70 my-3 list-disc pl-6">
                {children}
            </ul>
        ),

        ol: ({ children, id }) => (
            <ol id={id} className="marker:text-foreground/50 my-3 list-decimal pl-6 marker:tabular-nums">
                {children}
            </ol>
        ),

        li: ({ children, id }) => (
            <li id={id} className="py-1">
                {children}
            </li>
        ),

        blockquote: ({ children }) => <blockquote className="editorial-quote font-serif-jp">{children}</blockquote>,

        hr: () => (
            <div className="my-12 flex items-center justify-center">
                <span className="font-display text-foreground/70 text-xl tracking-[1em]">&sdot; &sdot; &sdot;</span>
            </div>
        ),

        table: ({ children }) => (
            <div className="border-foreground/60 my-8 overflow-x-auto border-y">
                <table className="w-full text-sm">{children}</table>
            </div>
        ),

        thead: ({ children }) => <thead className="border-foreground/60 border-b">{children}</thead>,

        th: ({ children }) => <th className="text-foreground/75 px-3 py-2.5 text-left text-xs font-semibold">{children}</th>,

        tr: ({ children }) => <tr className="border-foreground/10 border-b last:border-b-0">{children}</tr>,

        td: ({ children }) => <td className="px-3 py-2.5 align-top">{children}</td>,

        // Surface the language set by rehype-pretty-code as a header bar on the block
        pre: ({ children, className, ...rest }) => {
            const lang = (rest as Record<string, unknown>)["data-language"];
            const showLang = typeof lang === "string" && lang !== "" && lang !== "plaintext";
            return (
                <>
                    {showLang && (
                        <div className="code-head">
                            <span>{lang}</span>
                        </div>
                    )}
                    {/* The block is keyboard-focusable (tabindex from rehype), so it needs a role and name */}
                    <pre className={className} role="region" aria-label={showLang ? `${lang} code` : "code"} {...rest}>
                        {children}
                    </pre>
                </>
            );
        },

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
            <div className="border-accent my-8 border-l-2 py-1 pl-5" id={id}>
                <p className="text-accent flex items-center gap-2 text-xs font-semibold">
                    <FaExclamationCircle className="text-[11px]" />
                    <span>Warning</span>
                </p>
                <div className="mt-1 text-[15px]">{children}</div>
            </div>
        ),
    };
};

export const useComponents = (basepath: string) => {
    return useMemo(() => getComponents(basepath), [basepath]);
};
