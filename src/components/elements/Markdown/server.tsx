import { MDXRemote } from "next-mdx-remote-client/rsc";

import { type MarkdownProps, rehypePlugins, remarkPlugins } from "./common";
import { getComponents } from "./components";

export default async function Markdown({ content, basepath }: MarkdownProps) {
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
            components={getComponents(basepath)}
        />
    );
}
