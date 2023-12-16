import { PostList as PostListElement } from "@/components/layouts/blog/PostList";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getAllCategories } from "@/lib/blog/categories";
import { PostList } from "@/lib/blog/post";
import { Post } from "@/lib/blog/type";

export default async function Categories({ params }: { params: { cat: string } }) {
    const postpost = getPostList(params.cat);

    //console.log(postpost);

    return (
        <CommonSpacer>
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

    console.log(params);

    return params;
};

const getPostList = (category: string): Post[] => {
    const categoryFilteredPageList = PostList.fetch().getByCategory(decodeURI(category));
    const currentPagePosts = categoryFilteredPageList.getContentSplitedPosts(100).getPosts();

    return currentPagePosts;
};
