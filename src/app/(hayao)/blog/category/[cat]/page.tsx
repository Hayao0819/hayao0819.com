import { Metadata } from "next";

import { PageMasthead } from "@/components/elements/PageMasthead";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { findCategoryInfo, getAllCategories } from "@/lib/blog/categories";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { genMetaData } from "@/lib/meta";

export async function generateMetadata(props: { params: Promise<{ cat: string }> }): Promise<Metadata> {
    const params = await props.params;
    const decoded = decodeURIComponent(params.cat);
    return genMetaData({ title: findCategoryInfo(decoded)?.jp ?? decoded });
}

export default async function Categories(props: { params: Promise<{ cat: string }> }) {
    const params = await props.params;
    // params.cat may be URL-encoded or raw depending on how accessed
    const info = findCategoryInfo(decodeURIComponent(params.cat));
    // findCategoryInfo also resolves the ASCII slug aliases (url) to the Japanese name
    const categoryName = info?.jp ?? decodeURIComponent(params.cat);
    const postpost = getPostList(categoryName);

    return (
        <article>
            <PageMasthead kicker="Category" title={categoryName} lede={info?.desc} />

            <section>
                <PostListElement posts={postpost} showFeatured={false} uniform="wide" />
            </section>
        </article>
    );
}

export const generateStaticParams = async () => {
    const categories = getAllCategories();
    // ASCII slug aliases from CATEGORY_INFO must also be emitted so /blog/category/tech/ etc. exist
    const slugs = categories.map((c) => findCategoryInfo(c)?.url).filter((u): u is string => u !== undefined);
    // The dev router matches the percent-encoded segment, while the static export
    // needs the raw value to emit correctly named directories (Next.js #63975)
    const isDev = process.env.NODE_ENV === "development";
    const params = [...categories, ...slugs].map((c) => {
        return {
            cat: isDev ? encodeURIComponent(c) : c,
        };
    });

    return params;
};

const getPostList = (category: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByCategory(category).excludeHidden();
    const currentPagePosts = categoryFilteredPageList.getPosts();

    return currentPagePosts;
};
