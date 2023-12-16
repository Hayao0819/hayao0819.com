import classNames from "classnames";
import Link from "next/link";

import { Post } from "@/lib/blog/type";

import PostPreview from "./PostPreview";

export interface PostListProps {
    posts: Post[];
    allpages: number;
    currentPage: number;
}

export default async function PostList(props: PostListProps) {
    const { posts, currentPage, allpages } = props;

    return (
        <div className="flex h-full flex-col">
            <div className="grow sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
                {posts.map((f) => {
                    return <PostPreview key={f.file} posts={f} />;
                })}
            </div>

            <div className="flex items-center justify-center">
                {[...Array(allpages)].map((v, i) => {
                    i = i + 1;
                    const isCurrent = i === currentPage;
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
