import { FaArrowLeft } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params;
    const postpost = getPostList(decodeURI(params.tag));
    const tagName = decodeURI(params.tag);

    return (
        <div className="border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">#{tagName}</h1>
                <div className="flex flex-col">
                    <Link
                        href="/blog/tag"
                        className="flex items-center gap-2 border-b-4 border-base-content p-4 hover:bg-base-200"
                    >
                        <FaArrowLeft />
                        <span>タグ一覧に戻る</span>
                    </Link>
                    <PostListElement posts={postpost} />
                </div>
            </div>
        </div>
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
