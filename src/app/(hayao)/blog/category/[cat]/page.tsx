import PostListElement, { PostListProps } from "@/components/layouts/blog/PostList";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getAllCategories } from "@/lib/blog/categories";
import { POSTLIST_ONEPAGE } from "@/lib/blog/config";
import { PostList } from "@/lib/blog/post";

export default async function Categories({ params }: { params: { cat: string } }) {
    const postpost = await getPostList(params.cat);

    //console.log(postpost);

    return (
        <CommonSpacer>
            <PostListElement {...postpost} />
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

const getPostList = async (category: string): Promise<PostListProps> => {
    const categoryFilteredPageList = await PostList.fetch().getByCategory(decodeURI(category));
    const currentPagePosts = categoryFilteredPageList.getContentSplitedPosts(100).getPosts();

    const returnProps: PostListProps = {
        posts: currentPagePosts,
        allpages: Math.ceil(categoryFilteredPageList.getPosts().length / POSTLIST_ONEPAGE),
        currentPage: 1,
    };

    return returnProps;
};
