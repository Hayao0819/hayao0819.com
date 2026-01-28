import classNames from "clsx";
import { Metadata } from "next";
import path from "path";
import { use } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import Breadcrumbs from "@/components/elements/Breadcrumbs";
import { BlogHeading } from "@/components/elements/Heading";
import { Link } from "@/components/elements/Link";
import { ShareCurrentURL } from "@/components/elements/ShareCurrentURL";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import Toc from "@/components/layouts/blog/Toc";
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
    const TopLevelLink = ({ children, className }: { children: React.ReactNode; className: string }) => {
        if (!post) {
            return <div className={className}>{children}</div>;
        } else {
            return (
                <Link href={`/blog/posts/${post.url}`} className={className}>
                    {children}
                </Link>
            );
        }
    };

    return (
        <TopLevelLink
            className={classNames("flex items-center p-3", { "justify-end": type == "after" }, { "hover:text-accent": post })}
        >
            <span>{type == "before" && post ? <FaArrowLeft /> : null}</span>
            <span
                className={classNames("grow", "md:text-center", "mx-2", {
                    "text-left": type == "before",
                    "text-right": type == "after",
                })}
            >
                {post && post.meta.title ? post.meta.title : "ハヤオの次回作にご期待ください"}
            </span>
            <span>{type == "after" || !post ? <FaArrowRight /> : null}</span>
        </TopLevelLink>
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
        <div className="border-border flex h-full w-full flex-col border-4">
            {/* Header Section - Primary border for main section */}
            <div className="border-border/60 grid grid-cols-1 border-b-2 md:grid-cols-[auto_1fr]">
                <div className="border-border hidden items-center border-r-4 p-3 text-sm font-bold [writing-mode:vertical-lr] md:flex">
                    Post
                </div>
                <div className="flex flex-col">
                    {/* Title - 最も目立つ */}
                    <div className="p-6">
                        <BlogHeading level={1} className="break-phrase text-2xl leading-tight font-bold md:text-3xl">
                            {postData.post?.meta.title}
                        </BlogHeading>
                    </div>
                    {/* Meta info - 控えめ */}
                    <div className="border-border/30 flex items-center justify-between border-t px-6 py-3">
                        <div className="text-foreground/60 text-sm">{dateToString(postDate)}</div>
                        <div className="flex gap-2">
                            {postData.post?.meta.categories?.map((c) => {
                                return (
                                    <Link
                                        key={c}
                                        href={`/blog/category/${c}`}
                                        className="bg-foreground/5 hover:bg-foreground hover:text-background rounded-sm px-2.5 py-1 text-xs font-medium transition-colors"
                                    >
                                        {c}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs - Tertiary border */}
            <div className="border-border/30 border-b p-2">
                <Breadcrumbs start={2} />
            </div>

            {/* Table of Contents - Secondary border */}
            <Toc contentSelector={`#${contentId}`} />

            {/* Main Content - 余白を十分に確保 */}
            <div className="grow p-6 md:p-8" id={contentId}>
                {postData.parsed}
            </div>

            {/* Footer Section - Tertiary border */}
            <div className="border-border/30 border-t">
                <div className="border-border/30 border-b p-4">
                    <ShareCurrentURL text={postData.post.meta.title} />
                </div>
                <div className="grid grid-cols-1 text-sm md:grid-cols-2">
                    <div className="border-border/30 border-b md:border-r md:border-b-0">
                        <MostRecentPostPreview post={mostRecentUpdate.before} type="before" />
                    </div>
                    <div>
                        <MostRecentPostPreview post={mostRecentUpdate.after} type="after" />
                    </div>
                </div>
            </div>
        </div>
    );
}
