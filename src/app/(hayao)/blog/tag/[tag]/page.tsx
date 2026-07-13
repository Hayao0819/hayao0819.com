import { Metadata } from "next";

import { Link } from "@/components/elements/Link";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { genMetaData } from "@/lib/meta";

export async function generateMetadata(props: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const params = await props.params;
    return genMetaData({ title: `#${decodeURIComponent(params.tag)}` });
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params;
    const tagName = decodeURIComponent(params.tag);
    const postpost = getPostList(decodeURIComponent(params.tag));

    return (
        <article>
            <PageMasthead
                kicker="Tag"
                title={
                    <>
                        <span className="text-foreground/50">#</span>
                        {tagName}
                    </>
                }
            />

            <p className="-mt-6 mb-10 md:-mt-10">
                <Link href="/blog/tag" className="text-accent hover:text-foreground text-sm transition-colors">
                    <span aria-hidden>&larr;</span> タグ一覧に戻る
                </Link>
            </p>

            <section>
                <PostListElement posts={postpost} showFeatured={false} uniform="wide" />
            </section>
        </article>
    );
}

export const generateStaticParams = async () => {
    const tags = fetchedBlogPostList.getAllTags();
    // The dev router matches the percent-encoded segment, while the static export
    // needs the raw value to emit correctly named directories (Next.js #63975)
    const isDev = process.env.NODE_ENV === "development";
    const params = tags.map((c) => {
        return {
            tag: isDev ? encodeURIComponent(c) : c,
        };
    });

    return params;
};

const getPostList = (tag: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByTag(tag).excludeHidden();
    const currentPagePosts = categoryFilteredPageList.getPosts();

    return currentPagePosts;
};
