import classNames from "classnames";
import Link from "next/link";

import { Post } from "@/lib/blog/type";

import PostPreview from "./PostPreview";

export interface PostListProps {
    posts: Post[];
}

export function PostList({ posts }: PostListProps) {
    return (
        <div className="flex h-full flex-col">
            <div className="grow child:mb-2 sm:grid sm:grid-cols-3 sm:gap-4 child:sm:mb-0 lg:grid-cols-3">
                {posts.map((f) => {
                    return <PostPreview posts={f} key={f.file} />;
                })}
            </div>
        </div>
    );
}

export interface PostPageSwitchProps {
    allpages: number;
    currentPage: number;
    linktemplate: (page: number) => string;
}
export function PostPageSwitch({ allpages, currentPage, linktemplate }: PostPageSwitchProps) {
    return (
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
                        {isCurrent ? <p>{i}</p> : <Link href={linktemplate(i)}>{i}</Link>}
                    </span>
                );
            })}
        </div>
    );
}
