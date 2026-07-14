import rehypeCodeTitles from "rehype-code-titles";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkStrip from "strip-markdown";
import type { PluggableList } from "unified";

export const remarkPlugins: PluggableList = [remarkGfm, remarkMath];
export const remarkPluginsOnlyText: PluggableList = [remarkGfm, remarkStrip];

/* Site-native syntax theme — the site's paper/ink world instead of an
   imported palette: 墨 ink, 藍 #1F4E8C shades, and one brick tone for
   strings. Every color ≥4.5:1 on the block paper (#ECE8D9). */
const INK = "#1A1A1A"; //                墨 — default text        14.2:1
const INK_SOFT = "#66604E"; //           faded ink — comments      5.1:1
const AI = "#1F4E8C"; //                 藍 — keywords/tags        6.8:1
const AI_DEEP = "#10365F"; //            deep 藍 — functions      10.0:1
const AI_NEZU = "#3D5375"; //            藍鼠 — constants/types    6.4:1
const BRICK = "#8A2A24"; //              brick — strings           7.0:1

const paperInkTheme = {
    name: "hayao-paper-ink",
    type: "light" as const,
    colors: {
        "editor.background": "#ECE8D9",
        "editor.foreground": INK,
    },
    // rehype-pretty-code detects a theme object by this key (not `settings`)
    tokenColors: [
        { settings: { foreground: INK } },
        {
            scope: ["comment", "punctuation.definition.comment", "string.comment"],
            settings: { foreground: INK_SOFT, fontStyle: "italic" },
        },
        {
            scope: ["string", "punctuation.definition.string", "markup.quote"],
            settings: { foreground: BRICK },
        },
        {
            scope: [
                "keyword",
                "storage",
                "storage.type",
                "storage.modifier",
                "variable.language",
                "entity.name.tag",
                "punctuation.definition.keyword",
            ],
            settings: { foreground: AI },
        },
        {
            scope: [
                "entity.name.function",
                "support.function",
                "entity.name.method",
                "meta.function-call entity.name",
                "markup.heading",
            ],
            settings: { foreground: AI_DEEP },
        },
        {
            scope: [
                "constant",
                "constant.numeric",
                "constant.language",
                "constant.character",
                "variable.other.constant",
                "support.constant",
                "keyword.other.unit",
                "entity.name.type",
                "entity.name.class",
                "support.type",
                "support.class",
                "entity.other.attribute-name",
                "support.type.property-name",
            ],
            settings: { foreground: AI_NEZU },
        },
        {
            scope: ["variable", "variable.parameter", "keyword.operator", "punctuation"],
            settings: { foreground: INK },
        },
        { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
        { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
        { scope: ["markup.inserted"], settings: { foreground: AI } },
        { scope: ["markup.deleted"], settings: { foreground: BRICK } },
        {
            scope: ["markup.underline.link", "string.other.link"],
            settings: { foreground: AI },
        },
        { scope: ["invalid"], settings: { foreground: BRICK } },
    ],
};

/* Each <pre tabindex="0"> is a focusable scroll region — give it a name so
   screen readers don't announce an anonymous tab stop per code block. */
type HastNode = {
    type: string;
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: HastNode[];
};
const rehypeCodeRegionLabel = () => (tree: HastNode) => {
    const walk = (node: HastNode) => {
        if (node.tagName === "pre" && node.properties) {
            const lang = node.properties["data-language"] ?? node.properties.dataLanguage;
            if (typeof lang === "string") {
                node.properties.role = "region";
                node.properties["aria-label"] = `code: ${lang}`;
            }
        }
        node.children?.forEach(walk);
    };
    walk(tree);
};

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
            theme: paperInkTheme,
            keepBackground: false,
            defaultLang: "plaintext",
        },
    ],
    rehypeCodeRegionLabel,
    rehypeStringify,
];

export interface MarkdownProps {
    content: string;
    basepath: string;
    // onlyText?: boolean;
    // render?: "server" | "client";
}
