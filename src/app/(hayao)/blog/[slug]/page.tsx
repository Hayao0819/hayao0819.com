import { Metadata } from "next";

import { PostList as PostListElement, PostPageSwitch } from "@/components/layouts/blog/PostPreviewList";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { POSTLIST_ONEPAGE, SUMMARY_LENGTH } from "@/lib/blog/config";
import { getFetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { genMetaData } from "@/lib/meta";

export default async function BlogTop({ params }: { params: { slug: string } }) {
    const slug = parseInt(params.slug);
    const postlist = await getPostList(slug);

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

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
    const title = `記事一覧 ${params.slug}ページ目`;

    const base = {
        title: title,
        //description: description,
    };

    return genMetaData({
        ...base,
        twitter: {
            ...base,
            card: "summary_large_image",
        },
        openGraph: {
            ...base,
            type: "website",
        },
    });
};

export const generateStaticParams = async () => {
    const files = (await getFetchedBlogPostList()).getPosts();

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

type BlogTopProps = {
    posts: PostData[];
    allpages: number;
    currentPage: number;
};

const getPostList = async (currentPage: number) => {
    const allPostList = await getFetchedBlogPostList();
    const currentPagePosts: PostData[] = allPostList
        .getSplitedPosts(currentPage, POSTLIST_ONEPAGE)
        .getContentSplitedPosts(SUMMARY_LENGTH)
        .getPosts();

    const returnProps: BlogTopProps = {
        posts: currentPagePosts,
        allpages: Math.ceil(allPostList.getPosts().length / POSTLIST_ONEPAGE),
        currentPage: currentPage,
    };

    return returnProps;
};
