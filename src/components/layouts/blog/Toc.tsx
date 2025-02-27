"use client";

import { clsx } from "clsx";

import { BlogHeading as Heading } from "@/components/elements/Heading";
import Toc, { useHeadingTree } from "@/components/elements/Markdown/Toc";

const BlogToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <div className={clsx("bg- border-accent py-8", { hidden: tree.length < 1 })}>
            <Toc contentSelector={contentSelector} />
        </div>
    );
};

export default BlogToc;
