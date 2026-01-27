import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { getAllCategories } from "@/lib/blog/categories";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function Categories(props: { params: Promise<{ cat: string }> }) {
    const params = await props.params;
    // params.cat may be URL-encoded or raw depending on how accessed
    const categoryName = decodeURIComponent(params.cat);
    const postpost = getPostList(decodeURIComponent(params.cat));

    return (
        <div className="border-border w-full border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">{categoryName}</h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">{categoryName}</h1>
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
            cat: c,
        };
    });

    return params;
};

const getPostList = (category: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByCategory(category).excludeHidden();
    const currentPagePosts = categoryFilteredPageList.getPosts();

    return currentPagePosts;
};
