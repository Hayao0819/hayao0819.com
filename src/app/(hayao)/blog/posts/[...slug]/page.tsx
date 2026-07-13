import classNames from "clsx";
import { Metadata } from "next";
import path from "path";
import { use } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { ShareCurrentURL } from "@/components/elements/ShareCurrentURL";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import Toc, { SideToc } from "@/components/layouts/blog/Toc";
import useNoColonId from "@/hooks/useNoColonId";
import { BLOG_URL_FORMAT } from "@/lib/blog/config";
import { findPostFromUrl } from "@/lib/blog/fromurl";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { PostList } from "@/lib/markdown/postlist";
import { dateToString, recursivePath } from "@/lib/utils";

export const generateStaticParams = async () => {
    const mdFiles = fetchedBlogPostList.getPosts();
    const pages = mdFiles.flatMap((f) => {
        return recursivePath(f.url);
    });

    return pages.map((fileName) => {
        return {
            slug: fileName.split("/").filter((s) => s !== ""),
        };
    });
};

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const params = await props.params;
    const postData = findPostFromUrl(params.slug.join("/"));
    if (postData.isDir === true) {
        return {
            title: "Posts",
        };
    }

    const title = postData.post?.meta.title;
    const description = postData.post?.meta.description ? postData.post?.meta.description : postData.post?.content.slice(0, 100);
    const base = {
        title: title,
        description: description,
    };

    return {
        ...base,
        twitter: {
            ...base,
            card: "summary_large_image",
        },
        openGraph: {
            ...base,
            type: "website",
        },
    };
}

const NeighborLink = ({ post, type }: { post: PostData | null; type: "before" | "after" }) => {
    if (!post) {
        return (
            <div
                className={classNames(
                    "text-foreground/70 flex flex-col gap-2 text-sm",
                    type === "after" && "md:items-end md:text-right",
                )}
            >
                <span className="text-xs">{type === "before" ? "Previous" : "Next"}</span>
                <span>ハヤオの次回作にご期待ください</span>
            </div>
        );
    }
    return (
        <Link
            href={`/blog/posts/${post.url}`}
            className={classNames("group flex flex-col gap-2", type === "after" && "md:items-end md:text-right")}
        >
            <span className="text-foreground/75 flex items-center gap-1.5 text-xs">
                {type === "before" && <FaArrowLeft className="text-accent text-[10px]" />}
                <span>{type === "before" ? "Previous" : "Next"}</span>
                {type === "after" && <FaArrowRight className="text-accent text-[10px]" />}
            </span>
            <span className="font-display group-hover:text-accent text-base leading-tight font-bold transition-colors md:text-lg">
                {post.meta.title}
            </span>
        </Link>
    );
};

function estimateReadingTime(content: string): number {
    // ~400 jp chars/min or 200 en words/min
    const jpChars = (content.match(/[\u3000-\u303f぀-ゟ゠-ヿ＀-￯一-龯]/g) || []).length;
    const enWords = (content.replace(/[\u3000-\u303f぀-ゟ゠-ヿ＀-￯一-龯]/g, " ").match(/[a-zA-Z]+/g) || []).length;
    return Math.max(1, Math.round(jpChars / 500 + enWords / 220));
}

export default function PostPage(props: { params: Promise<{ slug: string[] }> }) {
    const params = use(props.params);
    const contentId = useNoColonId();

    // get post data
    const postData = findPostFromUrl(params.slug.join("/"));

    // handle dir page and 404
    if (postData.post === undefined) {
        if (postData.isDir === true) {
            const posts = new PostList().fetch(path.join(process.cwd(), "posts", ...params.slug), BLOG_URL_FORMAT).getPosts();

            return (
                <article>
                    <header className="border-foreground/20 mb-12 border-b pb-8 md:mb-16 md:pb-10">
                        <p className="tracked-caps text-accent mb-4 text-[11px]">{params.slug.join(" / ")}</p>
                        <h1 className="font-display break-phrase text-ink text-3xl leading-[1.08] font-black tracking-tight md:text-4xl lg:text-5xl">
                            Posts
                        </h1>
                    </header>
                    <section>
                        <PostListElement posts={posts} showFeatured={false} uniform="wide" />
                    </section>
                </article>
            );
        }

        return <div className="font-display py-20 text-center text-2xl">404 — page not found</div>;
    }

    // Correctly parse date
    const postDate = new Date(postData.post.meta.date || 0);
    const mostRecentUpdate = fetchedBlogPostList.getMostRecentPostByURL(postData.post.url);
    const readingTime = estimateReadingTime(postData.post.content);
    const primaryCategory = postData.post.meta.categories?.[0];
    const tags = postData.post.meta.tags ?? [];

    return (
        <article className="xl:grid xl:grid-cols-[minmax(0,var(--container-article))_240px] xl:gap-x-14">
            <div className="max-w-article w-full min-w-0 xl:max-w-none">
                {/* Headline — single column, no boxes, no decoration */}
                <header className="mb-8 md:mb-12">
                    {primaryCategory && (
                        <p className="tracked-caps mb-4 text-[11px] md:mb-6">
                            <Link
                                href={`/blog/category/${primaryCategory}`}
                                className="text-accent hover:text-foreground inline-flex min-h-6 items-center transition-colors"
                            >
                                {primaryCategory}
                            </Link>
                        </p>
                    )}
                    <h1 className="font-display break-phrase text-ink text-2xl leading-[1.2] font-black tracking-tight md:text-3xl md:leading-[1.2] lg:text-4xl lg:leading-[1.15]">
                        {postData.post?.meta.title}
                    </h1>
                    {postData.post.meta.description && (
                        <p className="font-display text-foreground/75 mt-4 max-w-[42em] text-base leading-normal md:mt-5">
                            {postData.post.meta.description}
                        </p>
                    )}
                    {/* Byline rules — dateline set between two hairlines, newspaper style */}
                    <div className="border-foreground/15 text-foreground/75 mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y py-3 text-xs md:mt-8">
                        <span className="tabular-nums">{dateToString(postDate, ".")}</span>
                        <span className="text-foreground/50" aria-hidden>
                            &middot;
                        </span>
                        <span>{readingTime} min read</span>
                        <span className="text-foreground/50" aria-hidden>
                            &middot;
                        </span>
                        <span>
                            By <span className="font-display font-bold">Yamada Hayao</span>
                        </span>
                    </div>
                </header>

                {/* Table of contents — inline below xl, sticky margin rail from xl up */}
                <Toc contentSelector={`#${contentId}`} />

                {/* Main editorial content — one serif text face for all long-form prose */}
                <div className="prose-editorial font-serif-jp mt-10 text-lg leading-[1.9]" id={contentId}>
                    {postData.parsed}
                </div>

                {/* Colophon strip — tags and share on one quiet block */}
                <div className="border-foreground/15 mt-16 flex flex-col gap-4 border-t pt-6">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
                            {tags.slice(0, 8).map((t) => (
                                <Link
                                    key={t}
                                    href={`/blog/tag/${t}`}
                                    className="text-accent hover:text-foreground transition-colors duration-150"
                                >
                                    #{t}
                                </Link>
                            ))}
                        </div>
                    )}
                    <ShareCurrentURL text={postData.post.meta.title} />
                </div>

                {/* Neighbouring posts */}
                <nav className="border-foreground/15 mt-16 border-t pt-8" aria-label="Neighbouring posts">
                    {/* Column rule between the two stories, front-page style */}
                    <div className="md:divide-foreground/15 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0 md:divide-x">
                        <div className="md:pr-10">
                            <NeighborLink post={mostRecentUpdate.before} type="before" />
                        </div>
                        <div className="md:pl-10">
                            <NeighborLink post={mostRecentUpdate.after} type="after" />
                        </div>
                    </div>
                </nav>
            </div>

            {/* Sticky contents rail — only on wide viewports */}
            <aside className="hidden xl:block">
                <SideToc contentSelector={`#${contentId}`} />
            </aside>
        </article>
    );
}
