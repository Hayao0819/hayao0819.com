"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { PostData } from "@/lib/markdown/post";
import * as utils from "@/lib/utils";

const PostPreview = ({ posts }: { posts: PostData }) => {
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

    const fullURL = "/blog/posts/" + posts.url;
    return (
        <motion.div
            className="border-b p-2"
            variants={animate}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <div className="flex h-full flex-col">
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
                                    <div className="p-1" key={s}>
                                        <Link href={`/blog/category/${s}`}>{s}</Link>
                                    </div>
                                );
                            })}
                    </div>
                    <p className="p-1">{utils.dateToString(postDate)}</p>
                </div>

                <div className="m-2 flex items-center justify-between">
                    <Link href={fullURL} className="grow text-xl text-accent underline-offset-8 hover:underline">
                        {posts.meta.title}
                    </Link>
                    <div className="flex">
                        {posts.meta.tags?.map((s) => {
                            return (
                                <Link href={`/blog/tag/${s}`} className="px-2 text-sm" key={s}>
                                    #{s}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="m-2 grow">
                    <Link href={fullURL}>{contentString}</Link>
                </div>

                <div className="flex justify-end">
                    <Link href={fullURL} className="btn btn-ghost p-1 text-accent">
                        Read More
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PostPreview;
