"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import { default as NextLink } from "next/link";
export default function Link(props: { children: React.ReactNode; href: string }) {
    const cn = classNames("link");

    return <NextLink {...props} className={cn} />;
}

export function AnimatedLink(props: { children: React.ReactNode; href: string }) {
    const underlineVariants = {
        hidden: { width: 0 },
        visible: { width: "100%" },
    };

    return (
        <span className="flex">
            <Link {...props} />
            <motion.div
                initial="hidden"
                whileHover="visible"
                variants={underlineVariants}
                transition={{ duration: 0.5 }}
                style={{
                    borderBottom: "2px solid blue", // アンダーラインのスタイルを設定
                    margin: "10px 0", // 必要に応じてマージンを調整
                }}
            />
        </span>
    );
}
