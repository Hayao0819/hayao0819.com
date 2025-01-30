import rehypeCodeTitles from "rehype-code-titles";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkStrip from "strip-markdown";
import { PluggableList } from "unified";

export const remarkPlugins: PluggableList = [remarkGfm, remarkMath];
export const remarkPluginsOnlyText: PluggableList = [remarkGfm, remarkStrip];

export const rehypePlugins: PluggableList = [
    // rehypeTypst,
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
            // transformers: [
            //     transformerCopyButton({
            //         visibility: "always",
            //         feedbackDuration: 3_000,
            //     }),
            // ],
        },
    ],
    rehypeStringify,
];

export interface MarkdownProps {
    content: string;
    basepath: string;
    toc?: boolean;
    // onlyText?: boolean;
    // render?: "server" | "client";
}
