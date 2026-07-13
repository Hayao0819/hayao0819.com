import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { PostList as PostListElement, PostPageSwitch } from "@/components/layouts/blog/PostPreviewList";
import { POSTLIST_ONEPAGE } from "@/lib/blog/config";
import { fetchedBlogPostListWithoutHidden } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { genMetaData } from "@/lib/meta";

// out-of-range page numbers 404 instead of erroring in dev
export const dynamicParams = false;

export default async function BlogTop(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = parseInt(params.slug);
    const allpages = Math.ceil(fetchedBlogPostListWithoutHidden.getPosts().length / POSTLIST_ONEPAGE);
    if (isNaN(slug) || slug < 1 || slug > allpages) notFound();
    const postlist = getPostList(slug);
    const categories = fetchedBlogPostListWithoutHidden.getAllCategories().filter((c) => c !== "ブログ");
    const totalPosts = fetchedBlogPostListWithoutHidden.getPosts().length;

    return (
        <div>
            <header className="mb-10">
                <PromptLine path="~/blog" comment={`page ${String(slug).padStart(2, "0")}`}>
                    ls -t
                </PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight">Blog</h1>
                <div className="text-foreground/70 mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[12px] tracking-[0.14em]">
                    {categories.map((c) => (
                        <Link key={c} href={`/blog/category/${c}`} className="hover:text-accent">
                            <span aria-hidden="true">/</span>
                            {c}
                        </Link>
                    ))}
                    <Link href="/blog/tag" className="hover:text-accent">
                        #tags
                    </Link>
                </div>
            </header>
            <hr className="hairline mb-6" />
            <p className="mono-eyebrow mb-8 tabular-nums">total {totalPosts}</p>
            <PostListElement posts={postlist.posts} />
            <hr className="hairline mt-12 mb-8" />
            <PostPageSwitch
                allpages={postlist.allpages}
                currentPage={postlist.currentPage}
                linktemplate={(page) => `/blog/${page}`}
            />
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
