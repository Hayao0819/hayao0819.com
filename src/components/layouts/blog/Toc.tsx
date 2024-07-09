"use client";

import { clsx } from "clsx";

import { BlogHeading as Heading } from "@/components/elements/Heading";
import { RenderHeadingTree, useHeadingTree } from "@/components/elements/Toc";

const Toc = ({ contentSelector }: { contentSelector: string }) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <div className={clsx("  border-accent py-8", { hidden: tree.length < 1 })}>
            <Heading level={2} className="text-accent">
                お品書き
            </Heading>
            <RenderHeadingTree tree={tree} />
        </div>
    );
};

export default Toc;
