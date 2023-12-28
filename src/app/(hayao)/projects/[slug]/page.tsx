import path from "path";

import { PostList } from "@/lib/markdown/postlist";

export const generateStaticParams = () => {
    const dirpath = ["src", "app", "(hayao)", "projects", "files"];
    const postlist = new PostList(path.join(...dirpath)).fetch().getPosts();

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
