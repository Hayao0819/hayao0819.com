import classNames from "clsx";
import { Metadata } from "next";
import { Link } from "next-view-transitions";
import path from "path";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import Breadcrumbs from "@/components/elements/Breadcrumbs";
import { BlogHeading } from "@/components/elements/Heading";
import { ShareCurrentURL } from "@/components/elements/ShareCurrentURL";
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

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
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

export default function PostPage({ params }: { params: { slug: string[] } }) {
    // get post data
    const postData = findPostFromUrl(params.slug.join("/"));

    // handle dir page and 404
    if (postData.post === undefined) {
        if (postData.isDir === true) {
            const posts = new PostList().fetch(path.join(process.cwd(), "posts", ...params.slug), BLOG_URL_FORMAT);

            return (
                <>
                    {posts.getPosts().map((p) => {
                        return (
                            <div key={p.url}>
                                <Link href={`/blog/posts/${p.url}`}>{p.meta.title}</Link>
                            </div>
                        );
                    })}
                </>
            );
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
            <div className="grow">{postData.parsed}</div>

            <div className="mt-4 h-fit border-t-2 border-secondary/15 pt-4">
                <ShareCurrentURL text={postData.post.meta.title} />
                <div className="mx-auto size-full items-stretch justify-around py-3 text-sm  md:grid md:grid-cols-2">
                    <MostRecentPostPreview post={mostRecentUpdate.before} type="before" />
                    <MostRecentPostPreview post={mostRecentUpdate.after} type="after" />
                </div>
            </div>
        </div>
    );
}
