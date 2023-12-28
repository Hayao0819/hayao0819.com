import { getFetchedProjectPostList } from "@/lib/projects";

export const generateStaticParams = () => {
    const postlist = getFetchedProjectPostList().getPosts();

    const params = postlist.map((p) => {
        return {
            slug: p.url,
        };
    });

    console.log(postlist);

    return params;
};

export default function Projects(hoge: { params: { slug: string } }) {
    console.log(hoge.params.slug);
    return <div>projects</div>;
}
