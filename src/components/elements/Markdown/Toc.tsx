"use client";

import clsx from "clsx";
import { default as NextLink } from "next/link";
import { ComponentPropsWithoutRef, memo, useEffect, useState } from "react";

interface TocProps extends ComponentPropsWithoutRef<"div"> {
    contentSelector: string;
}

type HeadingList = {
    id: string;
    text: string;
    level: number;
}[];

type HeadingTree = {
    id: string;
    text: string;
    level: number;
    children: HeadingTree[];
};

const genHeadingTree = (list: HeadingList) => {
    const tree: HeadingTree[] = [];
    for (const item of list) {
        // 木が空の場合
        if (tree.length === 0) {
            tree.push({ ...item, children: [] });
            continue;
        }

        const current = tree[tree.length - 1];
        // 同じレベルの場合
        if (current.level === item.level) {
            tree.push({ ...item, children: [] });
            continue;
        }

        // 深い階層の場合
        if (current.level < item.level) {
            current.children.push({ ...item, children: [] });
            continue;
        }
    }

    return tree;
};

const elementsToHeadingList = (elements: Element[]): HeadingList =>
    elements.map((e) => ({
        id: e.id,
        text: e.innerHTML,
        level: parseInt(e.tagName.slice(1)),
    }));

const elementsToHeadingTree = (elements: Element[]): HeadingTree[] => genHeadingTree(elementsToHeadingList(elements));

const RenderHeadingTree = ({ tree, indent }: { tree: HeadingTree[]; indent: number }) => {
    const isTopLevel = indent === 0;

    return (
        <ul
            className={clsx("list-none", {
                "space-y-2": isTopLevel,
                "mt-2 space-y-1 border-l-2 border-base-content/20 pl-4": !isTopLevel,
            })}
        >
            {tree.map((e, index) => (
                <li key={e.id} className="leading-relaxed">
                    <NextLink
                        href={`#${e.id}`}
                        scroll={true}
                        className={clsx(
                            "group flex items-start gap-3 transition-colors",
                            isTopLevel
                                ? "border-l-2 border-transparent py-1 pl-3 hover:border-accent hover:text-accent"
                                : "py-0.5 text-sm hover:text-accent",
                        )}
                    >
                        <span
                            className={clsx(
                                "shrink-0 font-mono transition-colors group-hover:text-accent",
                                isTopLevel ? "text-sm text-base-content/40" : "text-xs text-base-content/30",
                            )}
                        >
                            {isTopLevel ? `${(index + 1).toString().padStart(2, "0")}` : "•"}
                        </span>
                        <span className="group-hover:underline" dangerouslySetInnerHTML={{ __html: e.text }} />
                    </NextLink>
                    {e.children.length > 0 ? <RenderHeadingTree tree={e.children} indent={indent + 1} /> : null}
                </li>
            ))}
        </ul>
    );
};

export const useHeadingTree = (contentSelector: string) => {
    const [tree, setTree] = useState<HeadingTree[]>([]);

    useEffect(() => {
        const content = document.querySelector(contentSelector);
        if (!content) return;

        const headingTree = elementsToHeadingTree(
            Array.from(
                content.querySelectorAll(
                    // "h2, h3, h4, h5, h6"
                    "h2, h3",
                ),
            ),
        );
        setTree(headingTree);
    }, []);

    return tree;
};

export const Toc = ({ contentSelector, ...props }: TocProps) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <div {...props} className={clsx(props.className, { hidden: tree.length < 1 })}>
            <RenderHeadingTree tree={tree} indent={0} />
        </div>
    );
};

export default memo(Toc);
