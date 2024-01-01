import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Projects() {
    const postlist = getPJList();
    return (
        <CommonSpacer>
            <Heading level={1}>Projects</Heading>

            {postlist.map((p) => {
                return <div key={p.url}>{p.meta.title}</div>;
            })}
        </CommonSpacer>
    );
}

const getPJList = () => {
    const postlist = getFetchedProjectPostList().getContentSplitedPosts(SUMMARY_LENGTH);
    console.log(postlist.getPosts());

    return postlist.getPosts();
};
