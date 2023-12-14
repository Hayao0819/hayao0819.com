import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";

import * as blogtools from "@/lib/blog";
import { getPostFromPath } from "@/lib/blog/post";
import { Post } from "@/lib/blog/type";
import { recursivePath } from "@/lib/utils";

type PostProps = {
    post?: Post;
    isDir: boolean;
};

export const getStaticProps: GetStaticProps<PostProps> = async function ({ params }) {
    // get slug
    let rawSlug = params?.slug;
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
            props: {
                post: post,
                isDir: false,
            },
        };
    } else {
        return {
            props: {
                isDir: true,
            },
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const mdFiles = blogtools.getMdFilesInDir("posts");

    const pages = mdFiles.flatMap((f) => recursivePath(f));

    const paths = pages.map((fileName) => {
        const pageurl = blogtools.mdPathToURL(fileName);

        return {
            params: {
                slug: pageurl.split("/").filter((s) => s !== ""),
            },
        };
    });

    // return list of paths
    //console.log(paths);

    const ret = {
        paths: paths,
        fallback: false,
    };

    //console.log(paths[0]);
    return ret;
};

const Post = (props: PostProps) => {
    if (props.isDir) {
        return <div>ディレクトリ</div>;
    } else {
        return <div>{props.post?.meta.title}</div>;
    }
};

export default Post;
