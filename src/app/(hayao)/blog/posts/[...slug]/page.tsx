import classNames from "classnames";
import { Metadata } from "next";
import Link from "next/link";
import path from "path";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { BlogHeading } from "@/components/elements/Heading";
import ShareBtns from "@/components/elements/ShareBtns";
import { findPostFromUrl } from "@/lib/blog/fromurl";
import { getFetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { PostList } from "@/lib/markdown/postlist";
import { dateToString, recursivePath } from "@/lib/utils";

const postList = getFetchedBlogPostList();

export const generateStaticParams = async () => {
    const mdFiles = postList.getPosts();
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
    return {
        title: postData.post?.meta.title,
    };
}

const MostRecentPostPreview = ({ post, type }: { post: PostData | null; type: "before" | "after" }) => {
    if (!post) {
        return <></>;
    }

    //console.log(post);

    return (
        <Link href={`/blog/posts/${post.url}`} className="flex flex-col p-5 shadow-lg">
            <div className={classNames("flex items-center", { "justify-end": type == "after" })}>
                <span>{type == "before" ? <FaArrowLeft /> : null}</span>
                <span className="grow text-center">{post.meta.title}</span>
                <span>{type == "after" ? <FaArrowRight /> : null}</span>
            </div>
        </Link>
    );
};

export default function PostPage({ params }: { params: { slug: string[] } }) {
    // get post data
    const postData = findPostFromUrl(params.slug.join("/"));

    // handle dir page and 404
    if (postData.post === undefined && postData.isDir === false) {
        return <div>404</div>;
    }
    if (postData.isDir === true && postData.post === undefined) {
        const posts = new PostList().fetch(path.join(process.cwd(), "posts", ...params.slug), {});
        return (
            <>
                {posts.getPosts().map((p) => {
                    return <div key={p.url}>{p.meta.title}</div>;
                })}
            </>
        );
    }
    if (postData.post === undefined) {
        return <div>404</div>;
    }

    // Correctly parse date
    const postDate = new Date(postData.post.meta.date || 0);
    const mostRecentUpdate = postList.getMostRecentPostByURL(postData.post.url);

    return (
        <div className="mx-5 flex h-full flex-col">
            <div className="flex justify-between">
                <ul className="flex gap-4 text-sm text-accent">
                    {postData.post?.meta.categories?.map((c) => {
                        return (
                            <li key={c}>
                                <Link href={`/blog/category/${c}`}>{c}</Link>
                            </li>
                        );
                    })}
                </ul>
                <span>{dateToString(postDate)}</span>
            </div>
            <BlogHeading level={1}>{postData.post?.meta.title}</BlogHeading>
            <div className="grow">{postData.parsed}</div>

            <div className="mt-4 border-t-2 border-secondary/15 pt-4">
                <ShareBtns text="hoge" url="hoge" />
                <div className="mx-auto flex w-full min-w-fit flex-1 items-center justify-between child:w-1/2 md:w-2/3">
                    <MostRecentPostPreview post={mostRecentUpdate.before} type="before" />
                    <MostRecentPostPreview post={mostRecentUpdate.after} type="after" />
                </div>
            </div>
        </div>
    );
}
