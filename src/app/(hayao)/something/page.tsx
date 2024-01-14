import Link from "next/link";

import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Projects() {
    const postlist = getPJList();
    //console.log(postlist.map((p) => p.url));
    return (
        <CommonSpacer>
            <Heading level={1}>Something</Heading>
            <p>今までにつくった色々な何かへのリンクです。</p>

            {postlist.map((p) => {
                return (
                    <Link href={`/something/${p.url}`} key={p.url} className="flex flex-col p-4">
                        <span className="my-2 text-accent">{p.meta.title}</span>

                        <span>{p.meta.description}</span>
                    </Link>
                );
            })}
        </CommonSpacer>
    );
}

const getPJList = () => {
    const postlist = getFetchedProjectPostList().getContentSplitedPosts(SUMMARY_LENGTH);
    //console.log(postlist.getPosts());

    return postlist.getPosts();
};
