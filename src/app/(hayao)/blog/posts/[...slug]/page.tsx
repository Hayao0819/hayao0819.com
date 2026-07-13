import { Metadata } from "next";
import path from "path";
import { use } from "react";

import Breadcrumbs from "@/components/elements/Breadcrumbs";
import { BlogHeading } from "@/components/elements/Heading";
import KeyboardNav from "@/components/elements/KeyboardNav";
import { Link } from "@/components/elements/Link";
import { ShareCurrentURL } from "@/components/elements/ShareCurrentURL";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import Toc, { SideToc } from "@/components/layouts/blog/Toc";
import { PROSE_TIER } from "@/components/layouts/PageShell";
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

const MostRecentPostPreview = ({ post, type }: { post: PostData | null; type: "before" | "after" }) => {
    const placeholder = "ハヤオの次回作にご期待ください";
    if (!post) {
        return (
            <span className="font-body-prose text-foreground/65 block text-[14px]">
                {type === "before" ? "← " : ""}
                {placeholder}
                {type === "after" ? " →" : ""}
            </span>
        );
    }
    return (
        <Link
            href={`/blog/posts/${post.url}`}
            className="font-body-prose text-foreground/80 hover:text-accent break-phrase block text-[15px] text-pretty"
        >
            {type === "before" ? "← " : ""}
            {post.meta.title}
            {type === "after" ? " →" : ""}
        </Link>
    );
};

export default function PostPage(props: { params: Promise<{ slug: string[] }> }) {
    const params = use(props.params);
    const contentId = useNoColonId();

    // get post data
    const postData = findPostFromUrl(params.slug.join("/"));

    // handle dir page and 404
    if (postData.post === undefined) {
        if (postData.isDir === true) {
            const posts = new PostList().fetch(path.join(process.cwd(), "posts", ...params.slug), BLOG_URL_FORMAT).getPosts();

            return <PostListElement posts={posts} />;
        }

        return <div>404</div>;
    }
    // Correctly parse date
    const postDate = new Date(postData.post.meta.date || 0);
    const mostRecentUpdate = fetchedBlogPostList.getMostRecentPostByURL(postData.post.url);

    return (
        <article className={`relative w-full ${PROSE_TIER}`}>
            {/* Pager keys (j/k, gg/G) — article pages only */}
            <KeyboardNav />

            {/* Margin index — sticky in the right margin at ≥1280px */}
            <aside className="absolute top-0 bottom-0 left-full hidden xl:ml-8 xl:block xl:w-48 2xl:ml-12 2xl:w-60">
                <div className="sticky top-24 max-h-[calc(100vh-11rem)] overflow-y-auto overscroll-contain">
                    <SideToc contentSelector={`#${contentId}`} />
                </div>
            </aside>

            {/* Breadcrumb as prompt: ~/blog/posts $ cat ./<path> */}
            <div className="mono-eyebrow mb-8 flex flex-wrap items-baseline gap-x-[1ch] gap-y-1 text-[11px]">
                <span aria-hidden="true">~/blog/posts</span>
                <span className="text-accent" aria-hidden="true">
                    $
                </span>
                <span className="inline-flex flex-wrap items-baseline">
                    <span className="text-foreground/80" aria-hidden="true">
                        cat&nbsp;.
                    </span>
                    <Breadcrumbs start={2} />
                </span>
                <span
                    className="bg-accent animate-term-caret inline-block h-[1.05em] w-[0.55em] self-center align-text-bottom motion-reduce:animate-none"
                    aria-hidden="true"
                />
            </div>

            {/* Meta line */}
            <div className="mono-eyebrow flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11px]">
                <span className="tabular-nums">{dateToString(postDate, "-")}</span>
                {postData.post?.meta.categories?.map((c) => (
                    <Link key={c} href={`/blog/category/${c}`} className="text-foreground/70 hover:text-accent">
                        <span aria-hidden="true">/</span>
                        {c}
                    </Link>
                ))}
            </div>

            {/* Title — body face; a deliberate beat between mono meta and serif title */}
            <div className="mt-6 mb-10">
                <BlogHeading
                    level={1}
                    className="font-body-prose break-phrase text-3xl leading-[1.3] font-medium tracking-tight text-pretty md:text-4xl"
                >
                    {postData.post?.meta.title}
                </BlogHeading>
            </div>

            <hr className="hairline mb-6" />

            {/* TOC */}
            <Toc contentSelector={`#${contentId}`} />

            {/* Content — body face for prose */}
            <div
                className="prose font-body-prose text-foreground/90 prose-headings:font-body-prose prose-a:text-accent prose-strong:text-foreground prose-code:font-mono max-w-none py-6 text-[17px] leading-[1.9] md:text-[18px]"
                id={contentId}
                data-prose="body"
            >
                {postData.parsed}
            </div>

            <hr className="hairline my-10" />

            {/* Share */}
            <div className="text-[12px]">
                <p className="mono-eyebrow mb-3">// share</p>
                <ShareCurrentURL text={postData.post.meta.title} />
            </div>

            <hr className="hairline my-10" />

            {/* Prev/Next */}
            <nav className="grid grid-cols-1 gap-6 text-[13px] md:grid-cols-2">
                <div>
                    <p className="mono-eyebrow mb-2">// prev</p>
                    <MostRecentPostPreview post={mostRecentUpdate.before} type="before" />
                </div>
                <div className="md:text-right">
                    <p className="mono-eyebrow mb-2">// next</p>
                    <MostRecentPostPreview post={mostRecentUpdate.after} type="after" />
                </div>
            </nav>
        </article>
    );
}
