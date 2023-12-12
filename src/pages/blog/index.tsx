import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";

import Layout from "@/components/layouts/Layout";
import * as blogtools from "@/libs/blog";

export interface PostMeta extends Record<string, string | string[] | undefined> {
    title?: string;
    date?: string;
    category?: string;
    tags?: string[];
}

interface BlogTopProps {
    posts: {
        file: string;
        url: string;
        meta: PostMeta;
        content: string;
    }[];
}

export default function BlogTop({ posts }: BlogTopProps) {
    return (
        <Layout>
            <p>ブログトップ</p>
            <ul>
                {posts.map((f) => {
                    return (
                        <li key={f.file}>
                            <a href={f.url}>{f.meta.title}</a>
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<BlogTopProps> = async () => {
    const returnProps: BlogTopProps = {
        posts: [],
    };

    const files = blogtools.getBlogFilesInDir("posts");

    files.forEach((file) => {
        console.log(file);

        const fileContent = fs.readFileSync(file, "utf-8");
        const parsed = matter(fileContent);
        const meta: PostMeta = {};

        Object.keys(parsed.data).forEach((key) => {
            if (key === "date") {
                meta[key] = new Date(parsed.data[key]).toISOString();
            } else {
                meta[key] = parsed.data[key];
            }
        });

        console.log(meta);

        returnProps.posts.push({
            file: file,
            url: blogtools.mdPathToURL(file),
            meta: meta,
            content: parsed.content,
        });
    });

    return {
        props: returnProps,
    };
};
