import { Metadata } from "next";
import path from "path";

import { BlogHeading } from "@/components/elements/Heading";
import ShareBtns from "@/components/elements/ShareBtns";
import { getFetchedBlogPostList } from "@/lib/blog/post";
import { findPostFromUrl } from "@/lib/markdown/fromurl";
import { PostList } from "@/lib/markdown/postlist";
import { recursivePath } from "@/lib/utils";

export const generateStaticParams = async () => {
    const mdFiles = getFetchedBlogPostList().getPosts();
    const pages = mdFiles.flatMap((f) => {
        return recursivePath(f.url);
    });

    return pages.map((fileName) => {
        return {
            slug: fileName.split("/").filter((s) => s !== ""),
        };
    });
};

export default function PostPage({ params }: { params: { slug: string[] } }) {
    const postData = findPostFromUrl(params.slug.join("/"));
    console.log(postData);

    if (postData.isDir === true) {
        const posts = new PostList().fetch(path.join(process.cwd(), "posts", ...params.slug), {});
        return (
            <>
                {posts.getPosts().map((p) => {
                    return <div key={p.url}>{p.meta.title}</div>;
                })}
            </>
        );
    } else {
        return (
            <div className="mx-5 flex h-full flex-col">
                <BlogHeading level={1}>{postData.post?.meta.title}</BlogHeading>
                <div className="grow">{postData.parsed}</div>
                <ShareBtns text="hoge" url="hoge" />
            </div>
        );
    }
}

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
