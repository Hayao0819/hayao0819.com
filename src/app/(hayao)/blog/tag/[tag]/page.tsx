import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { getFetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function Categories({ params }: { params: { tag: string } }) {
    const postpost = await getPostList(params.tag);

    //console.log(params.cat);

    return (
        <CommonSpacer>
            <Link href="/blog/tag" className="mb-2 flex items-center p-2 hover:text-accent">
                <FaArrowLeft />
                <p>タグ一覧に戻る</p>
            </Link>
            <PostListElement posts={postpost} />
        </CommonSpacer>
    );
}

export const generateStaticParams = async () => {
    const tags = (await getFetchedBlogPostList()).getAllTags();
    const params = tags.map((c) => {
        return {
            tag: encodeURI(c),
        };
    });

    return params;
};

const getPostList = async (tag: string): Promise<PostData[]> => {
    const categoryFilteredPageList = (await getFetchedBlogPostList()).getByTag(tag);
    const currentPagePosts = categoryFilteredPageList.getContentSplitedPosts(SUMMARY_LENGTH).getPosts();

    return currentPagePosts;
};
