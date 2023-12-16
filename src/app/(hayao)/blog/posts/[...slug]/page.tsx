import fs from "fs";
import { ReactNode } from "react";

import { BlogHeading } from "@/components/elements/Heading";
import StringToMd from "@/components/elements/StringToMd";
import * as blogtools from "@/lib/blog";
import { getAllPosts, getPostFromPath } from "@/lib/blog/post";
import { Post } from "@/lib/blog/type";
import { recursivePath } from "@/lib/utils";

type PostProps = {
    post?: Post;
    parsed?: ReactNode;
    isDir: boolean;
};

const fetchPostData = async function (path: string): Promise<PostProps> {
    // get slug
    let rawSlug = path;
    if (!rawSlug) {
        throw new Error("slug is undefined");
    } else if (Array.isArray(rawSlug)) {
        rawSlug = rawSlug.join("/");
    }

    const filePathes: string[] = [`${rawSlug}.mdx`, `${rawSlug}/index.mdx`, `${rawSlug}.md`, `${rawSlug}/index.md`].map((p) => {
        return "posts/" + p;
    });

    const targetFile = (function (): string | undefined {
        for (const filePath of filePathes) {
            if (fs.existsSync(filePath)) {
                return filePath;
            }
        }
    })();

    if (targetFile) {
        const post = getPostFromPath(targetFile);
        console.log(post);

        return {
            post: post,
            isDir: false,
            parsed: <StringToMd content={post.content} />,
        };
    } else {
        return {
            isDir: true,
        };
    }
};

export const generateStaticParams = async () => {
    const mdFiles = getAllPosts();
    const pages = mdFiles.flatMap((f) => recursivePath(f.url));
    const paths = pages.map((fileName) => {
        const pageurl = blogtools.mdPathToURL(fileName);

        return {
            slug: pageurl.split("/").filter((s) => s !== ""),
        };
    });

    //console.log(paths);

    return paths;
};

const Post = async ({ params }: { params: { slug: string } }) => {
    const postData = await fetchPostData(params.slug);

    if (postData.isDir) {
        return <div>ディレクトリ</div>;
    } else {
        return (
            <div className="mx-auto flex w-1/2  break-words">
                <div className="w-4/5">
                    <BlogHeading level={1}>{postData.post?.meta.title}</BlogHeading>
                    {postData.parsed}
                </div>
                <div className="w-1/5">
                    <BlogHeading level={2}>Categories</BlogHeading>

                    <BlogHeading level={2}>Recent Posts</BlogHeading>
                </div>
            </div>
        );
    }
};

export default Post;
