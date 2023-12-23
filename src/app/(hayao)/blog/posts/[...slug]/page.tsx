import fs from "fs";
import Link from "next/link";
import { ReactNode } from "react";

import { BlogHeading } from "@/components/elements/Heading";
import Markdown from "@/components/elements/Markdown";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { Url } from "@/lib/blog";
import { getAllCategories } from "@/lib/blog/categories";
import { getPostDataFromFile, PostData } from "@/lib/blog/post";
import { getAllPosts, PostList } from "@/lib/blog/postlist";
import { recursivePath } from "@/lib/utils";

type PostProps = {
    post?: PostData;
    parsed?: ReactNode;
    isDir: boolean;
};

const fetchPostData = function (path: string): PostProps {
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
            //console.log("check: " + filePath);
            if (fs.existsSync(filePath)) {
                return filePath;
            }
        }
    })();

    if (targetFile) {
        const post = getPostDataFromFile(targetFile);
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
        //console.log(f.url);
        return recursivePath(f.url);
    });
    //console.log(mdFiles.map((m) => m.url));
    const paths = pages.map((fileName) => {
        const pageurl = Url.mdPathToURL(fileName);
        //console.log(fileName);

        return {
            slug: pageurl.split("/").filter((s) => s !== ""),
        };
    });

    //console.log(paths);

    return paths;
};

const PostPage = ({ params }: { params: { slug: string } }) => {
    const postData = fetchPostData(params.slug);
    const categories = getAllCategories();

    const postlist = new PostList().fetch().getPosts().slice(undefined, 10);

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
                                    <Link href={`/blog/category/${c}`}>{c}</Link>
                                </li>
                            );
                        })}
                    </ul>

                    <BlogHeading level={2} className="border-b-4">
                        Recent Posts
                    </BlogHeading>
                    <ul>
                        {postlist.map((p) => {
                            return (
                                <li key={p.file} role="link" className="my-2 cursor-pointer text-sm hover:underline">
                                    <Link href={`/blog/posts/${p.url}`}>{p.meta.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </CommonSpacer>
        );
    }
};

export default PostPage;
