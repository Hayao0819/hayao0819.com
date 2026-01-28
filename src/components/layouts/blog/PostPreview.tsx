"use client";

import { motion, Variants } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

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
            y: 50,
            opacity: 0,
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
            },
        },
    };

    const fullURL = "/blog/posts/" + post.url;
    return (
        <motion.article className="group" variants={animate} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
            <div className="border-border/30 hover:border-border/60 rounded-sm border p-5 transition-all">
                {/* Header: Category & Date - 最も控えめ */}
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex gap-2">
                        {post.categories.map((s) => (
                            <Link
                                key={s}
                                href={`/blog/category/${s}`}
                                className="bg-foreground/5 hover:bg-foreground hover:text-background rounded-sm px-2.5 py-1 text-xs font-medium transition-colors"
                            >
                                {s}
                            </Link>
                        ))}
                    </div>
                    <Link
                        className="text-foreground/50 text-xs tabular-nums"
                        href={`/blog/posts/${utils.dateToString(postDate, "")}`}
                    >
                        {utils.dateToString(postDate)}
                    </Link>
                </div>

                {/* Title - 最も目立つ */}
                <Link href={fullURL}>
                    <h2 className="text-foreground mb-2 text-lg leading-snug font-bold">{post.meta.title}</h2>
                </Link>

                {/* Tags - 控えめ */}
                {post.meta.tags && post.meta.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                        {post.meta.tags.map((s) => (
                            <Link
                                href={`/blog/tag/${s}`}
                                className="text-foreground/40 hover:text-foreground text-xs transition-colors"
                                key={s}
                            >
                                #{s}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Summary - 中程度 */}
                <p className="text-foreground/60 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.content.slice(0, SUMMARY_LENGTH)}
                </p>

                {/* Read More - 控えめなアクション */}
                <Link
                    href={fullURL}
                    className="text-foreground/60 hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                >
                    <span>Read More</span>
                    <FaArrowRight className="text-xs" />
                </Link>
            </div>
        </motion.article>
    );
};

export default PostPreview;
