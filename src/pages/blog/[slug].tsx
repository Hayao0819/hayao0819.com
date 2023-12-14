import classNames from "classnames";
import { GetStaticProps } from "next";

import Layout from "@/components/layouts/Layout";
import * as blogtools from "@/lib/blog";
import { MDFILE_DIR, POSTLIST_ONEPAGE } from "@/lib/blog/config";
import { getAllPosts } from "@/lib/blog/post";
import { Post } from "@/lib/blog/type";
import * as utils from "@/lib/utils";

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
    console.log(posts.url);

    return (
        <a href={"/blog/" + posts.url} className="mb-4 flex flex-col border-2 border-solid border-neutral">
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

                <p className="">{utils.dateToString(postDate)}</p>
            </div>
            <div className="m-2">{posts.content}</div>
        </a>
    );
};

export const getStaticPaths = async () => {
    const files = blogtools.getMdFilesInDir(MDFILE_DIR);

    const filecount = Math.ceil(files.length / POSTLIST_ONEPAGE);

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
    const allPosts: Post[] = getAllPosts();

    const slug = parseInt(params?.slug as string) - 1;

    const returnProps: BlogTopProps = {
        posts: allPosts
            .map((p) => {
                return {
                    ...p,
                    content: p.content.slice(0, 100),
                };
            })
            .slice(slug * POSTLIST_ONEPAGE, (slug + 1) * POSTLIST_ONEPAGE),
        allpages: Math.ceil(allPosts.length / POSTLIST_ONEPAGE),
        currentPage: slug,
    };

    //console.log(returnProps);

    return {
        props: returnProps,
    };
};
