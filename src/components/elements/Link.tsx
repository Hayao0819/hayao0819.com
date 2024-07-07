"use client";

import classNames from "clsx";
import { motion } from "framer-motion";
import { default as NextLink } from "next/link";
import { Link as NextTransitionsLink } from "next-view-transitions";
import { ComponentPropsWithoutRef } from "react";

//type LinkProps = ComponentPropsWithoutRefAndClassName<"a">;
type NextLinkProps = ComponentPropsWithoutRef<typeof NextLink>;

export default function Link(props: NextLinkProps) {
    const cn = classNames("link", props.className);

    return <NextTransitionsLink {...props} className={cn} />;
}

export function AnimatedLink(props: NextLinkProps) {
    const underlineVariants = {
        hidden: { width: 0 },
        visible: { width: "100%" },
    };

    return (
        <span className="flex">
            <NextLink {...props} />
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
