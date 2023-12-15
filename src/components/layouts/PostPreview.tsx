import Link from "next/link";

import { Post } from "@/lib/blog/type";
import * as utils from "@/lib/utils";
const PostPreview = ({ posts }: { posts: Post }) => {
    if (!posts.meta.title || !posts.meta.date) {
        return <></>;
    }

    const postDate = new Date(posts.meta.date);
    //console.log(posts.url);

    return (
        <Link href={"/blog/" + posts.url} className="mb-4 flex flex-col border-2 border-solid border-neutral">
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
        </Link>
    );
};

export default PostPreview;
