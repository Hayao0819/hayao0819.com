import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { PostList as PostListElement } from "@/components/layouts/blog/PostList";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getAllCategories } from "@/lib/blog/categories";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { PostData } from "@/lib/blog/post";
import { PostList } from "@/lib/blog/postlist";

export default async function Categories({ params }: { params: { cat: string } }) {
    const postpost = getPostList(params.cat);

    //console.log(postpost);

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

    //console.log(params);

    return params;
};

const getPostList = (category: string): PostData[] => {
    const categoryFilteredPageList = PostList.fetch().getByCategory(decodeURI(category));
    const currentPagePosts = categoryFilteredPageList.getContentSplitedPosts(SUMMARY_LENGTH).getPosts();

    return currentPagePosts;
};
