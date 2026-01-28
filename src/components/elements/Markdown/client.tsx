"use client";

import { MDXClient } from "next-mdx-remote-client/csr";
import { serialize, SerializeResult } from "next-mdx-remote-client/serialize";
import { memo, useEffect, useState } from "react";

import { MarkdownProps, remarkPlugins, remarkPluginsOnlyText } from "./common";
import { useComponents } from "./components";

type SerializedResult = SerializeResult<Record<string, unknown>, Record<string, unknown>>;

const getSerializedResult = (content: string, onlyText: boolean) =>
    serialize<Record<string, unknown>, Record<string, unknown>>({
        source: content,
        options: {
            mdxOptions: {
                remarkPlugins: onlyText ? remarkPluginsOnlyText : remarkPlugins,
                rehypePlugins: [],
                format: "md",
            },
        },
    });

const Markdown = ({ content, basepath }: MarkdownProps) => {
    const [serialized, setSerialized] = useState<SerializedResult | null>(null);
    useEffect(() => {
        getSerializedResult(content, false).then(
            (result) => {
                setSerialized(result);
            },
            (err) => {
                console.error(err);
            },
        );
    }, []);

    const components = useComponents(basepath);

    if (serialized === null) {
        return <p>Loading...</p>;
    }

    if ("error" in serialized) {
        return <p>Error: {serialized.error.message}</p>;
    }

    return <MDXClient compiledSource={serialized.compiledSource} scope={serialized.scope} components={components} />;
};

export default memo(Markdown);
