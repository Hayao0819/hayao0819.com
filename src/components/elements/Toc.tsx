"use client";

import { ComponentPropsWithoutRef, useEffect } from "react";
import * as tocbot from "tocbot";

import useNoColonId from "@/hooks/useNoColonId";

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

            scrollSmooth: false,
            scrollSmoothDuration: 0,
        });

        // コンポーネントがアンマウントされたときにTocbotを破棄
        return () => tocbot.destroy();
    }, []);

    return <div id={id} {...props}></div>;
};

export default Toc;
