"use client";

import { clsx } from "clsx";

import Toc, { useHeadingTree } from "@/components/elements/Markdown/Toc";

const BlogToc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <div className={clsx("border-border/30 w-full border-b text-sm", { hidden: tree.length < 1 })}>
            <div className="flex">
                <div className="border-border flex items-center self-stretch border-r-4 p-3 text-xs font-bold [writing-mode:vertical-lr]">
                    Contents
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4">
                    <Toc contentSelector={contentSelector} />
                </div>
            </div>
        </div>
    );
};

export default BlogToc;
