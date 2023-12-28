import fs from "fs";
import { ReactNode } from "react";

import { BlogHeading } from "@/components/elements/Heading";
import Markdown from "@/components/elements/Markdown";
import { Url } from "@/lib/blog";
import { getPostDataFromFile, PostData } from "@/lib/markdown/post";
import { getAllPosts } from "@/lib/markdown/postlist";
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

    if (postData.isDir) {
        return <div>ディレクトリ</div>;
    } else {
        return (
            <div className="">
                <BlogHeading level={1}>{postData.post?.meta.title}</BlogHeading>
                {postData.parsed}
            </div>
        );
    }
};

export default PostPage;
