import { FaArrowLeft } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params;
    // params.tag may be URL-encoded or raw depending on how accessed
    const tagName = decodeURIComponent(params.tag);
    const postpost = getPostList(decodeURIComponent(params.tag));

    return (
        <div className="border-border w-full border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                    #{tagName}
                </h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">#{tagName}</h1>
                <div className="flex flex-col">
                    <Link
                        href="/blog/tag"
                        className="border-border/60 hover:bg-foreground/5 flex items-center gap-2 border-b-2 p-4 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>タグ一覧に戻る</span>
                    </Link>
                    {/* Post List - 余白で分離 */}
                    <div className="flex flex-col gap-4 p-4">
                        <PostListElement posts={postpost} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const generateStaticParams = async () => {
    const tags = fetchedBlogPostList.getAllTags();
    const params = tags.map((c) => {
        return {
            tag: c,
        };
    });

    return params;
};

const getPostList = (tag: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByTag(tag).excludeHidden();
    const currentPagePosts = categoryFilteredPageList.getPosts();

    return currentPagePosts;
};
