"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { Post } from "@/lib/blog/type";
import * as utils from "@/lib/utils";
const PostPreview = ({ posts }: { posts: Post }) => {
    if (!posts.meta.title || !posts.meta.date) {
        return <></>;
    }

    const postDate = new Date(posts.meta.date);

    const animate: Variants = {
        offscreen: {
            y: 100,
            opacity: 0,
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const contentString = posts.content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "").slice(0, 100) + "...";

    return (
        <motion.div
            className="border-4 border-solid border-neutral"
            variants={animate}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <Link href={"/blog/" + posts.url} className="flex h-full flex-col">
                <div className="flex justify-between">
                    <div className="flex justify-start">
                        {(posts.meta.categories ? posts.meta.categories : ["その他"])
                            .filter((c) => {
                                return c !== "ブログ";
                            })
                            .map((c) => {
                                return c ? c : "その他";
                            })
                            .map((s) => {
                                return (
                                    <div className="bg-primary p-1 text-primary-content" key={s}>
                                        {s}
                                    </div>
                                );
                            })}
                    </div>
                    <p className="p-1">{utils.dateToString(postDate)}</p>
                </div>

                <div className="m-2 flex justify-between">
                    <p className="text-xl">{posts.meta.title}</p>
                </div>
                <div className="m-2 grow">{contentString}</div>

                <div className="flex justify-end">
                    <p className="btn btn-ghost p-1">Read More</p>
                </div>
            </Link>
        </motion.div>
    );
};

export default PostPreview;
