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
            <Heading level={1}>Projects</Heading>
            <p>今までにつくった色々なものへのリンクです。</p>

            <p className="">（Projectsはまだ作成中です）</p>

            {postlist.map((p) => {
                return (
                    <Link href={`/projects/${p.url}`} key={p.url} className="flex w-52 flex-col p-4  shadow-lg">
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
