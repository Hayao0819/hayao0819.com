import classNames from "classnames";
import Link from "next/link";

import PostPreview from "@/components/layouts/PostPreview";
import * as blogtools from "@/lib/blog";
import { MDFILE_DIR, POSTLIST_ONEPAGE } from "@/lib/blog/config";
import { getAllPosts } from "@/lib/blog/post";
import { Post } from "@/lib/blog/type";

interface BlogTopProps {
    posts: Post[];
    allpages: number;
    currentPage: number;
}

export default async function BlogTop({ params }: { params: { slug: number } }) {
    const { posts, currentPage, allpages } = await getPostList(params.slug);

    return (
        <div className="flex h-full flex-col">
            <div className="grow sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {posts.map((f) => {
                    return <PostPreview key={f.file} posts={f} />;
                })}
            </div>

            <div className="flex items-center justify-center">
                {[...Array(allpages)].map((v, i) => {
                    i = i + 1;
                    const isCurrent = i === currentPage + 1;
                    return (
                        <span
                            key={i}
                            className={classNames("px-2 text-lg", {
                                " underline": isCurrent,
                            })}
                        >
                            {isCurrent ? <p>{i}</p> : <Link href={`/blog/${i}`}>{i}</Link>}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export const generateStaticParams = async () => {
    const files = blogtools.getMdFilesInDir(MDFILE_DIR);

    const filecount = Math.ceil(files.length / POSTLIST_ONEPAGE);

    const params = [...Array(filecount)]
        .map((v, i) => i + 1)
        .map((i) => {
            return {
                slug: i.toString(),
            };
        });

    //console.log(params);

    return params;
};

const getPostList = async (currentPage: number) => {
    const allPosts: Post[] = getAllPosts();

    const slug = currentPage - 1;

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

    return returnProps;
};
