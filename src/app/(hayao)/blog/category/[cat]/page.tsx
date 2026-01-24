import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { getAllCategories } from "@/lib/blog/categories";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function Categories(props: { params: Promise<{ cat: string }> }) {
    const params = await props.params;
    const postpost = getPostList(decodeURI(params.cat));
    const categoryName = decodeURI(params.cat);

    return (
        <div className="border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">
                    {categoryName}
                </h1>
                <div className="flex flex-col">
                    <PostListElement posts={postpost} />
                </div>
            </div>
        </div>
    );
}

export const generateStaticParams = async () => {
    const categories = getAllCategories();
    const params = categories.map((c) => {
        return {
            cat: encodeURI(c),
        };
    });

    return params;
};

const getPostList = (category: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByCategory(category).excludeHidden();
    const currentPagePosts = categoryFilteredPageList.getPosts();

    return currentPagePosts;
};
