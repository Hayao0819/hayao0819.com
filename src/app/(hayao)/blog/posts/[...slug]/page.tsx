import { BlogHeading } from "@/components/elements/Heading";
import { getFetchedBlogPostList } from "@/lib/blog/post";
import { findPostFromUrl } from "@/lib/markdown/fromurl";
import { recursivePath } from "@/lib/utils";

export const generateStaticParams = async () => {
    const mdFiles = getFetchedBlogPostList().getPosts();
    const pages = mdFiles.flatMap((f) => {
        return recursivePath(f.url);
    });

    return pages.map((fileName) => {
        return {
            slug: fileName.split("/").filter((s) => s !== ""),
        };
    });
};

export default function PostPage({ params }: { params: { slug: string } }) {
    const postData = findPostFromUrl(params.slug);

    if (postData.isDir) {
        return <div>404</div>;
    } else {
        return (
            <div className="">
                <BlogHeading level={1}>{postData.post?.meta.title}</BlogHeading>
                {postData.parsed}
            </div>
        );
    }
}
