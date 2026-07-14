"use client";

import { Link } from "@/components/elements/Link";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import type { StaticPostData } from "@/lib/markdown/post";
import * as utils from "@/lib/utils";

const PostPreview = ({ posts: post }: { posts: StaticPostData }) => {
    if (!post.meta.title || !post.meta.date) {
        return null;
    }

    const postDate = new Date(post.meta.date);
    const fullURL = `/blog/posts/${post.url}`;

    return (
        <article className="group">
            <div className="mono-eyebrow flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11px]">
                <span className="tabular-nums">{utils.dateToString(postDate, "-")}</span>
                {post.categories.map((s) => (
                    <Link
                        key={s}
                        href={`/blog/category/${s}`}
                        className="-my-2 inline-flex py-2 text-foreground/70 hover:text-accent"
                    >
                        /{s}
                    </Link>
                ))}
            </div>

            <Link
                href={fullURL}
                className="relative mt-2 block before:pointer-events-none before:absolute before:top-[0.82em] before:left-[-1.1em] before:h-[0.42em] before:w-[0.42em] before:-translate-y-1/2 before:bg-accent before:opacity-0 before:transition-opacity before:duration-[120ms] before:content-[''] hover:before:opacity-100 focus-visible:before:opacity-100 group-focus-within:before:opacity-100 group-hover:before:opacity-100 motion-reduce:before:transition-none"
            >
                <h2 className="break-phrase text-pretty font-body-prose font-medium text-[19px] text-foreground leading-snug transition-colors group-hover:text-accent">
                    {post.meta.title}
                </h2>
            </Link>

            <p className="mt-2 line-clamp-2 font-body-prose text-[16px] text-foreground/70 leading-[1.8]">
                {utils.markdownToPlainText(post.content).slice(0, SUMMARY_LENGTH)}
            </p>
        </article>
    );
};

export default PostPreview;
