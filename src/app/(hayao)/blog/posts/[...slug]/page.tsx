import fs from "fs";
import { ReactNode } from "react";

import { BlogHeading } from "@/components/elements/Heading";
import Markdown from "@/components/elements/Markdown";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import * as blogtools from "@/lib/blog";
import { getAllCategories } from "@/lib/blog/categories";
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
        //console.log(post);

        return {
            post: post,
            isDir: false,
            parsed: <Markdown content={post.content} />,
        };
    } else {
        return {
            isDir: true,
        };
    }
};

export const generateStaticParams = async () => {
    const mdFiles = getAllPosts();
    const pages = mdFiles.flatMap((f) => {
        console.log(f.url);
        return recursivePath(f.url);
    });
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
    const categories = await getAllCategories();

    if (postData.isDir) {
        return <div>ディレクトリ</div>;
    } else {
        return (
            <CommonSpacer className="flex">
                <div className="w-4/5">
                    <BlogHeading level={1}>{postData.post?.meta.title}</BlogHeading>
                    {postData.parsed}
                </div>
                <div className="w-1/5">
                    <BlogHeading level={2} className="border-b-4">
                        Categories
                    </BlogHeading>
                    <ul>
                        {categories.map((c) => {
                            return (
                                <li key={c}>
                                    <a href="/"></a>
                                </li>
                            );
                        })}
                    </ul>

                    <BlogHeading level={2} className="border-b-4">
                        Recent Posts
                    </BlogHeading>
                </div>
            </CommonSpacer>
        );
    }
};

export default Post;
