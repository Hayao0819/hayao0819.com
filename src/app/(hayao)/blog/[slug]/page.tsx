import { PostList as PostListElement, PostPageSwitch } from "@/components/layouts/blog/PostList";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import * as blogtools from "@/lib/blog";
import { MDFILE_DIR, POSTLIST_ONEPAGE } from "@/lib/blog/config";
import { PostList } from "@/lib/blog/post";
import { Post } from "@/lib/blog/type";

export default async function BlogTop({ params }: { params: { slug: string } }) {
    const slug = parseInt(params.slug);
    const postlist = getPostList(slug);

    return (
        <CommonSpacer className="flex flex-col">
            <div className="grow">
                <PostListElement posts={postlist.posts} />
            </div>
            <PostPageSwitch
                allpages={postlist.allpages}
                currentPage={postlist.currentPage}
                linktemplate={(page) => `/blog/${page}`}
            />
        </CommonSpacer>
    );
}

export const generateStaticParams = async () => {
    const files = blogtools.getMdFilesInDir(MDFILE_DIR);

    const filecount = Math.ceil(files.length / POSTLIST_ONEPAGE);

    const params = [...Array(filecount)]
        .map((v, i) => i + 1)
        .map((i) => {
            return {
                slug: i.toString(),
            };
        });

    //console.log(params);

    return params;
};

interface BlogTopProps {
    posts: Post[];
    allpages: number;
    currentPage: number;
}

const getPostList = (currentPage: number) => {
    const allPostList = PostList.fetch();
    const currentPagePosts = allPostList.getSplitedPosts(currentPage, POSTLIST_ONEPAGE).getContentSplitedPosts(100).getPosts();

    const returnProps: BlogTopProps = {
        posts: currentPagePosts,
        allpages: Math.ceil(allPostList.getPosts().length / POSTLIST_ONEPAGE),
        currentPage: currentPage,
    };

    return returnProps;
};
