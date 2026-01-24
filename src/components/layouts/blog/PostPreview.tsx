"use client";

import { motion, Variants } from "framer-motion";

import { Link } from "@/components/elements/Link";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { StaticPostData } from "@/lib/markdown/post";
import * as utils from "@/lib/utils";

const PostPreview = ({ posts: post }: { posts: StaticPostData }) => {
    if (!post.meta.title || !post.meta.date) {
        return <></>;
    }

    const postDate = new Date(post.meta.date);

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

    const fullURL = "/blog/posts/" + post.url;
    return (
        <motion.div
            className="border-b-4 border-base-content p-4 last:border-b-0"
            variants={animate}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {post.categories.map((s) => (
                            <Link
                                key={s}
                                href={`/blog/category/${s}`}
                                className="border border-base-content px-2 py-0.5 text-xs hover:bg-base-content hover:text-base-100"
                            >
                                {s}
                            </Link>
                        ))}
                    </div>
                    <Link className="text-sm text-base-content/70" href={`/blog/posts/${utils.dateToString(postDate, "")}`}>
                        {utils.dateToString(postDate)}
                    </Link>
                </div>

                <div className="m-2 flex items-center justify-between">
                    {/* タイトル */}
                    <Link href={fullURL} className="grow text-xl font-bold underline-offset-8 hover:underline">
                        {post.meta.title}
                    </Link>

                    {/* タグ一覧 */}
                    <div className="hidden md:flex">
                        {post.meta.tags?.map((s) => {
                            return (
                                <Link href={`/blog/tag/${s}`} className="px-2 text-sm" key={s}>
                                    #{s}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="m-2 grow">
                    <Link href={fullURL} className="text-sm">
                        {/* <Markdown content={post.content.slice(0, SUMMARY_LENGTH)} onlyText basepath={"/posts/" + post.url} /> */}
                        {post.content.slice(0, SUMMARY_LENGTH)}
                    </Link>
                </div>

                <div className="flex justify-end">
                    <Link
                        href={fullURL}
                        className="border border-base-content px-2 py-1 text-sm hover:bg-base-content hover:text-base-100"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PostPreview;
