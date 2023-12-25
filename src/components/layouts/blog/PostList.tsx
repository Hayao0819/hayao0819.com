import classNames from "classnames";
import Link from "next/link";

import { PostData } from "@/lib/blog/post";

import PostPreview from "./PostPreview";

export interface PostListProps {
    posts: PostData[];
}

export function PostList({ posts }: PostListProps) {
    return (
        <div className="flex flex-col gap-12">
            {posts.map((f) => {
                return <PostPreview posts={f} key={f.file} />;
            })}
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
