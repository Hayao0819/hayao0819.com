import Layout from "@/components/layouts/Layout";
import * as blogtools from "@/libs/blog";

export default function BlogTop() {
    return (
        <Layout>
            <p>ブログトップ</p>
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = blogtools.getBlogFilesInDir("posts").map((f) => {
        return blogtools.mdPathToURL(f);
    });
    console.log("files:", posts);
    return {
        props: {
            posts: [],
        },
    };
}
