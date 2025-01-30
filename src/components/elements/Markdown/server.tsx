import "@/style/markdown.css";

import { MDXRemote } from "next-mdx-remote/rsc";

import { MarkdownProps, rehypePlugins, remarkPlugins } from "./common";
import { getComponents } from "./components";

export default async function Markdown({ content, basepath, toc }: MarkdownProps) {
    // console.log(content);

    return (
        <MDXRemote
            source={content}
            options={{
                mdxOptions: {
                    remarkPlugins: remarkPlugins,
                    rehypePlugins,
                },
            }}
            components={getComponents(basepath, toc)}
        />
    );
}
