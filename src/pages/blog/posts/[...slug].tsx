import { GetStaticPaths } from "next";
import path from "path";

import * as blogtools from "@/libs/blog";

export async function getStaticProps() {
    return { props: { post: "" } };
}

const recursivePath = (pathName: string) => {
    const splited = pathName.split("/").filter((s) => s !== "");

    return splited.map((d, i) => {
        return path.join(...splited.slice(undefined, i), d);
    });
};

export const getStaticPaths: GetStaticPaths = async () => {
    const mdFiles = blogtools.getBlogFilesInDir("posts");

    const pages = mdFiles.flatMap((f) => recursivePath(f));

    const paths = pages.map((fileName) => {
        const pageurl = blogtools.mdPathToURL(fileName);

        return {
            params: {
                slug: pageurl.split("/").filter((s) => s !== ""),
            },
        };
    });

    // return list of paths

    const ret = {
        paths: paths,
        fallback: false,
    };

    console.log(paths[0]);
    return ret;
};

const Post = () => {
    return <div>コンテンツ</div>;
};

export default Post;
