import { FaArrowLeft } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function Categories(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params;
    const postpost = getPostList(params.tag);

    //console.log(params.cat);

    return (
        <>
            <Link href="/blog/tag" className="mb-2 flex items-center p-2 hover:text-accent">
                <FaArrowLeft />
                <p>タグ一覧に戻る</p>
            </Link>
            <PostListElement posts={postpost} />
        </>
    );
}

export const generateStaticParams = async () => {
    const tags = fetchedBlogPostList.getAllTags();
    const params = tags.map((c) => {
        return {
            tag: encodeURI(c),
        };
    });

    return params;
};

const getPostList = (tag: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByTag(tag).excludeHidden();
    const currentPagePosts = categoryFilteredPageList.getPosts();

    return currentPagePosts;
};
