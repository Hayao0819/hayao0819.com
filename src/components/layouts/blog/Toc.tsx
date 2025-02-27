"use client";

import { clsx } from "clsx";

import Toc, { useHeadingTree } from "@/components/elements/Markdown/Toc";

const BlogToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <div className={clsx("w-full border-accent text-sm text-gray-800 ", { hidden: tree.length < 1 })}>
            <div className="m-8 mx-auto w-fit p-4">
                <Toc contentSelector={contentSelector} />
            </div>
        </div>
    );
};

export default BlogToc;
