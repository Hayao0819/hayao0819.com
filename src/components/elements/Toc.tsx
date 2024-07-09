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

export const RenderHeadingTree = ({ tree }: { tree: HeadingTree[] }) => {
    const levelClassNames: { [key: number]: string } = {
        1: "",
        2: "",
        3: "ml-4",
    };
    return (
        <ul>
            {tree.map((e) => (
                <li key={e.id} className={levelClassNames[e.level]}>
                    <NextLink href={`#${e.id}`} scroll={true}>
                        {e.text}
                    </NextLink>
                    <RenderHeadingTree tree={e.children} />
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

        const headingTree = elementsToHeadingTree(Array.from(content.querySelectorAll("h2, h3, h4, h5, h6")));
        setTree(headingTree);
    }, []);

    return tree;
};

export const Toc = ({ contentSelector, ...props }: TocProps) => {
    const tree = useHeadingTree(contentSelector);

    return (
        <div {...props} className={clsx(props.className, { hidden: tree.length < 1 })}>
            <RenderHeadingTree tree={tree} />
        </div>
    );
};

export default memo(Toc);
