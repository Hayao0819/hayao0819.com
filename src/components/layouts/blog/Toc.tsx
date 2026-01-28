"use client";

import { clsx } from "clsx";

import Toc, { useHeadingTree } from "@/components/elements/Markdown/Toc";

const BlogToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <div className={clsx("border-border/30 w-full border-b text-sm", { hidden: tree.length < 1 })}>
            <div className="grid grid-cols-[auto_1fr]">
                <div className="border-border flex items-center border-r-4 p-3 text-xs font-bold [writing-mode:vertical-lr]">
                    Contents
                </div>
                <div className="p-4">
                    <Toc contentSelector={contentSelector} />
                </div>
            </div>
        </div>
    );
};

export default BlogToc;
