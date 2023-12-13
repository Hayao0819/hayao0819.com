import classNames from "classnames";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";

import Layout from "@/components/layouts/Layout";
import * as blogtools from "@/libs/blog";

const onePage = 4;

export interface PostMeta extends Record<string, string | string[] | undefined> {
    title?: string;
    date?: string;
    categories?: string[];
    tags?: string[];
}

export interface Post {
    file: string;
    url: string;
    meta: PostMeta;
    content: string;
}

interface BlogTopProps {
    posts: Post[];
    allpages: number;
    currentPage: number;
}

export default function BlogTop({ posts, currentPage, allpages }: BlogTopProps) {
    return (
        <Layout sidebar={Sidebar()}>
            <div>
                {posts.map((f) => {
                    return <PostPreview key={f.file} posts={f} />;
                })}
            </div>

            <div className="flex justify-center">
                {[...Array(allpages)].map((v, i) => {
                    i = i + 1;
                    const isCurrent = i === currentPage + 1;
                    return (
                        <span
                            key={i}
                            className={classNames("mx-1", {
                                "text-blue-500": isCurrent,
                            })}
                        >
                            {isCurrent ? <p>{i}</p> : <a href={`/blog/${i}`}>{i}</a>}
                        </span>
                    );
                })}
            </div>
        </Layout>
    );
}

const Sidebar = () => {
    return <>再度</>;
};

const PostPreview = ({ posts }: { posts: Post }) => {
    if (!posts.meta.title || !posts.meta.date) {
        return <></>;
    }

    const postDate = new Date(posts.meta.date);

    return (
        <a href={posts.url} className="mb-4 flex flex-col border-2 border-solid border-neutral">
            <div className="flex justify-start">
                {(posts.meta.categories ? posts.meta.categories : ["その他"])
                    .filter((c) => {
                        return c !== "ブログ";
                    })
                    .map((c) => {
                        return c ? c : "その他";
                    })
                    .map((s) => {
                        return (
                            <div className="bg-neutral p-1 text-neutral-content" key={s}>
                                {s}
                            </div>
                        );
                    })}
            </div>

            <div className="m-2 flex justify-between">
                <p className="text-lg">{posts.meta.title}</p>

                <p className="">{dateToString(postDate)}</p>
            </div>
            <div className="m-2">{posts.content}</div>
        </a>
    );
};

const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}/${month}/${day}`;
};

export const getStaticPaths = async () => {
    const files = blogtools.getBlogFilesInDir("posts");

    const filecount = Math.ceil(files.length / onePage);

    const params = [...Array(filecount)]
        .map((v, i) => i + 1)
        .map((i) => {
            return {
                params: {
                    slug: i.toString(),
                },
            };
        });

    //console.log(params);

    return {
        paths: params,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<BlogTopProps> = async ({ params }) => {
    const allPosts: Post[] = [];

    const files = blogtools.getBlogFilesInDir("posts");

    files.forEach((file) => {
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

        //console.log(meta);

        allPosts.push({
            file: file,
            url: "posts/" + blogtools.mdPathToURL(file),
            meta: meta,
            content: parsed.content.slice(0, 100),
        });
    });

    const slug = parseInt(params?.slug as string) - 1;

    const returnProps: BlogTopProps = {
        posts: allPosts
            .filter((p) => {
                return p.meta.title && p.meta.date;
            })
            .sort((a, b) => {
                if (!a.meta.date || !b.meta.date) {
                    return 0;
                }
                return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
            })
            .slice(slug * onePage, (slug + 1) * onePage),
        allpages: Math.ceil(allPosts.length / onePage),
        currentPage: slug,
    };

    //console.log(returnProps);

    return {
        props: returnProps,
    };
};
