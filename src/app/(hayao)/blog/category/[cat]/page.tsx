import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { getAllCategories } from "@/lib/blog/categories";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";

export default async function Categories({ params }: { params: { cat: string } }) {
    const postpost = getPostList(params.cat);

    return (
        <div>
            <PostListElement posts={postpost} />
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

    //console.log({ categories, params });

    return params;
};

const getPostList = (category: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByCategory(category);
    console.log(category);
    const currentPagePosts = categoryFilteredPageList.getContentSplitedPosts(SUMMARY_LENGTH).getPosts();

    return currentPagePosts;
};
