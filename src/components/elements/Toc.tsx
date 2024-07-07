"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import * as tocbot from "tocbot";

import useNoColonId from "@/hooks/useNoColonId";

import Link from "./Link";

interface TocProps extends ComponentPropsWithoutRef<"div"> {
    contentSelector: string;
}

const Toc = ({ contentSelector, ...props }: TocProps) => {
    const id = useNoColonId();
    useEffect(() => {
        // Tocbotの初期化
        tocbot.init({
            tocSelector: `#${id}`, // 目次の表示部分
            contentSelector: contentSelector, // 目次を生成する対象
            headingSelector: "h2, h3", // 目次に表示する見出しのタグ
        });

        // コンポーネントがアンマウントされたときにTocbotを破棄
        return () => tocbot.destroy();
    }, []);

    return <div id={id} {...props}></div>;
};

export const TocWithoutTocBot = ({ contentSelector, ...props }: TocProps) => {
    const [htmlIds, setHtmlIds] = useState<Element[]>([]);
    useEffect(() => {
        setHtmlIds(Array.from(document.querySelector(contentSelector)?.querySelectorAll("h2, h3") || []));
    }, []);

    return (
        <div {...props}>
            {htmlIds.map((e) => (
                <li key={e.id}>
                    <Link href={`#${e.id}`}>{e.innerHTML}</Link>
                </li>
            ))}
        </div>
    );
};

export default Toc;
