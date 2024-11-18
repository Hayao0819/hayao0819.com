import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getFetchedProjectPostList, getProjectFromURL } from "@/lib/projects";

export const generateStaticParams = () => {
    const postlist = getFetchedProjectPostList().getPosts();

    const params = postlist.map((p) => {
        return {
            slug: p.url,
        };
    });

    // console.log(postlist);

    return params;
};

export default function Projects(hoge: { params: { slug: string } }) {
    console.log(hoge);
    const postElement = getProjectFromURL(hoge.params.slug);

    return postElement ? <CommonSpacer>{postElement}</CommonSpacer> : <div>404</div>;
}
