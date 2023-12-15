import fs from "fs";

import * as blogtools from "@/lib/blog";
import { getPostFromPath } from "@/lib/blog/post";
import { Post } from "@/lib/blog/type";
import { recursivePath } from "@/lib/utils";

type PostProps = {
    post?: Post;
    isDir: boolean;
};

export const fetchPostData = async function (path: string): Promise<PostProps> {
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
        return {
            post: post,
            isDir: false,
        };
    } else {
        return {
            isDir: true,
        };
    }
};

export const generateStaticParams = async () => {
    const mdFiles = blogtools.getMdFilesInDir("posts");
    const pages = mdFiles.flatMap((f) => recursivePath(f));
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
        return <div>{postData.post?.meta.title}</div>;
    }
};

export default Post;
