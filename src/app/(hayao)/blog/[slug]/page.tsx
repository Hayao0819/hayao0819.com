import { Metadata } from "next";

import { PostList as PostListElement, PostPageSwitch } from "@/components/layouts/blog/PostPreviewList";
import { POSTLIST_ONEPAGE } from "@/lib/blog/config";
import { fetchedBlogPostListWithoutHidden } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { genMetaData } from "@/lib/meta";

export default async function BlogTop(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = parseInt(params.slug);
    const postlist = getPostList(slug);

    return (
        <div className="border-border w-full border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                    Blog
                </h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">Blog</h1>
                <div className="flex flex-col">
                    {/* Post List - 余白で分離 */}
                    <div className="flex grow flex-col gap-4 p-4">
                        <PostListElement posts={postlist.posts} />
                    </div>
                    {/* Pagination - Secondary border */}
                    <div className="border-border/60 border-t-2 p-4">
                        <PostPageSwitch
                            allpages={postlist.allpages}
                            currentPage={postlist.currentPage}
                            linktemplate={(page) => `/blog/${page}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const generateMetadata = async (props: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
    const params = await props.params;
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
    const files = fetchedBlogPostListWithoutHidden.getPosts();

    const filecount = Math.ceil(files.length / POSTLIST_ONEPAGE);

    const params = [...Array(filecount)]
        .map((_, i) => i + 1)
        .map((i) => {
            return {
                slug: i.toString(),
            };
        });

    return params;
};

type BlogTopProps = {
    posts: PostData[];
    allpages: number;
    currentPage: number;
};

const getPostList = (currentPage: number) => {
    const currentPagePosts: PostData[] = fetchedBlogPostListWithoutHidden
        .getSplitedPosts(currentPage, POSTLIST_ONEPAGE)
        .getPosts();

    const returnProps: BlogTopProps = {
        posts: currentPagePosts,
        allpages: Math.ceil(fetchedBlogPostListWithoutHidden.getPosts().length / POSTLIST_ONEPAGE),
        currentPage: currentPage,
    };

    return returnProps;
};
