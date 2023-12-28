import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getAllCategories } from "@/lib/blog/categories";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { getFetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function Categories({ params }: { params: { cat: string } }) {
    const postpost = getPostList(params.cat);

    console.log(params.cat);

    return (
        <CommonSpacer>
            <Link href="/blog/category" className="mb-2 flex items-center p-2 hover:text-accent">
                <FaArrowLeft />
                <p>カテゴリ一覧に戻る</p>
            </Link>
            <PostListElement posts={postpost} />
        </CommonSpacer>
    );
}

export const generateStaticParams = async () => {
    const categories = getAllCategories();
    const params = categories.map((c) => {
        return {
            cat: encodeURI(c),
        };
    });

    console.log({ categories, params });

    return params;
};

const getPostList = (category: string): PostData[] => {
    const categoryFilteredPageList = getFetchedBlogPostList().getByCategory(category);
    const currentPagePosts = categoryFilteredPageList.getContentSplitedPosts(SUMMARY_LENGTH).getPosts();

    return currentPagePosts;
};
