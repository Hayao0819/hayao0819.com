import { PROSE_TIER } from "@/components/layouts/PageShell";
import { getFetchedProjectPostList, getProjectFromURL } from "@/lib/projects";

export const generateStaticParams = () => {
    const postlist = getFetchedProjectPostList().getPosts();

    const params = postlist.map((p) => {
        return {
            slug: p.url,
        };
    });

    return params;
};

export default async function Projects(hoge: { params: Promise<{ slug: string }> }) {
    const postElement = getProjectFromURL((await hoge.params).slug);

    return postElement ? (
        <div
            className={`prose font-body-prose text-foreground/90 w-full ${PROSE_TIER} text-[17px] leading-[1.9]`}
            data-prose="body"
        >
            {postElement}
        </div>
    ) : (
        <div>404</div>
    );
}
