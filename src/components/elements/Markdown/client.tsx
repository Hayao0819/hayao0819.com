"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { memo, useEffect, useState } from "react";

import { MarkdownProps, remarkPlugins, remarkPluginsOnlyText } from "./common";
import { useComponents } from "./components";

type SerializedResult = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;

const getSerializedResult = (content: string, onlyText: boolean) =>
    serialize(content, {
        mdxOptions: {
            remarkPlugins: onlyText ? remarkPluginsOnlyText : remarkPlugins,
            rehypePlugins: [],
            format: "md",
        },
    });

const Markdown = ({ content, basepath, toc }: MarkdownProps) => {
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

    const components = useComponents(basepath, toc);
    return serialized === null ? <p>Loading...</p> : <MDXRemote {...serialized} components={components} />;
};

export default memo(Markdown);
