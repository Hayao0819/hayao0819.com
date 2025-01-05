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
        <div className="mx-5 flex h-full flex-col">
            <div className="flex items-center justify-between">
                <Breadcrumbs start={2} className="hidden md:block" />
            </div>
            <ul className="flex justify-end gap-4 text-sm text-accent">
                {postData.post?.meta.categories?.map((c) => {
                    return (
                        <li key={c}>
                            <Link href={`/blog/category/${c}`}>{c}</Link>
                        </li>
                    );
                })}
            </ul>
            <div className="my-6">
                <BlogHeading level={1} className="break-phrase">
                    {postData.post?.meta.title}
                </BlogHeading>
                <div className="text-center">{dateToString(postDate)}</div>
            </div>
            <div className="border-b-2 border-secondary/15">
                <Toc contentSelector={`#${contentId}`} />
            </div>
            <div className="grow" id={contentId}>
                {postData.parsed}
            </div>

            <div className="mt-4 h-fit border-t-2 border-secondary/15 pt-4">
                <ShareCurrentURL text={postData.post.meta.title} />
                <div className="items-stretch justify-around py-3 text-sm  md:grid md:grid-cols-2">
                    <MostRecentPostPreview post={mostRecentUpdate.before} type="before" />
                    <MostRecentPostPreview post={mostRecentUpdate.after} type="after" />
                </div>
            </div>
        </div>
    );
}
