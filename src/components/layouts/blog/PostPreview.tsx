"use client";

import { Link } from "@/components/elements/Link";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { StaticPostData } from "@/lib/markdown/post";
import * as utils from "@/lib/utils";

const PostPreview = ({ posts: post }: { posts: StaticPostData }) => {
    if (!post.meta.title || !post.meta.date) {
        return <></>;
    }

    const postDate = new Date(post.meta.date);
    const fullURL = "/blog/posts/" + post.url;

    return (
        <article className="group">
            <div className="mono-eyebrow flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11px]">
                <span className="tabular-nums">{utils.dateToString(postDate, "-")}</span>
                {post.categories.map((s) => (
                    <Link
                        key={s}
                        href={`/blog/category/${s}`}
                        className="text-foreground/70 hover:text-accent -my-2 inline-flex py-2"
                    >
                        /{s}
                    </Link>
                ))}
            </div>

            <Link href={fullURL} className="tui-cursor mt-2 block">
                <h2 className="font-body-prose text-foreground group-hover:text-accent break-phrase text-[19px] leading-snug font-medium text-pretty transition-colors">
                    {post.meta.title}
                </h2>
            </Link>

            <p className="font-body-prose text-foreground/70 mt-2 line-clamp-2 text-[16px] leading-[1.8]">
                {utils.markdownToPlainText(post.content).slice(0, SUMMARY_LENGTH)}
            </p>
        </article>
    );
};

export default PostPreview;
