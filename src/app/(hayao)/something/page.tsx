import { Link } from "@/components/elements/Link";
import PageTitle from "@/components/elements/PageTitle";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Projects() {
    const postlist = getPJList();
    //console.log(postlist.map((p) => p.url));
    return (
        <CommonSpacer>
            <PageTitle>制作物</PageTitle>
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

const getPJList = () => getFetchedProjectPostList().getPosts();
