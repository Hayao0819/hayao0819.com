import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";

import * as blogtools from "@/libs/blog";
import { Post } from "@/libs/blog/type";

type PostProps = Post;

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

    const targetFile = (function (): string {
        for (const filePath of filePathes) {
            if (fs.existsSync(filePath)) {
                return filePath;
            }
        }
        throw new Error("file not found");
    })();

    const { data, content } = matter(fs.readFileSync(targetFile, "utf-8"));

    return {
        props: {
            file: "",
            url: "",
            meta: {
                title: data.title,
                date: data.date,
            },
            content: content,
        },
    };
};

const recursivePath = (pathName: string) => {
    const splited = pathName.split("/").filter((s) => s !== "");

    return splited.map((d, i) => {
        return path.join(...splited.slice(undefined, i), d);
    });
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

    const ret = {
        paths: paths,
        fallback: false,
    };

    //console.log(paths[0]);
    return ret;
};

const Post = () => {
    return <div>コンテンツ</div>;
};

export default Post;
