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
            className="border-b p-2"
            variants={animate}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <div className="flex h-full flex-col">
                <div className="flex justify-between">
                    <div className="flex justify-start">
                        {post.categories.map((s) => (
                            <div className="p-1" key={s}>
                                <Link href={`/blog/category/${s}`}>{s}</Link>
                            </div>
                        ))}
                    </div>
                    <p className="p-1">
                        <Link className="text-sm" href={`/blog/posts/${utils.dateToString(postDate, "")}`}>
                            {utils.dateToString(postDate)}
                        </Link>
                    </p>
                </div>

                <div className="m-2 flex items-center justify-between">
                    {/* タイトル */}
                    <Link href={fullURL} className="grow text-xl text-accent underline-offset-8 hover:underline">
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
                    <Link href={fullURL} className="btn btn-ghost p-1 text-accent">
                        Read More
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PostPreview;
