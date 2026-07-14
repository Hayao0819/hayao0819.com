import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { getAllCategories } from "@/lib/blog/categories";
import { fetchedBlogPostList } from "@/lib/blog/post";
import type { PostData } from "@/lib/markdown/post";

export default async function Categories(props: { params: Promise<{ cat: string }> }) {
    const params = await props.params;
    // params.cat may be URL-encoded or raw depending on how accessed
    const categoryName = decodeURIComponent(params.cat);
    const postpost = getPostList(decodeURIComponent(params.cat));

    return (
        <div>
            <header className="mb-8">
                <PromptLine path="~/blog/category">ls {categoryName}/</PromptLine>
                <h1 className="mt-4 font-body-prose text-3xl leading-tight tracking-tight">{categoryName}</h1>
            </header>
            <Link href="/blog/category" className="mb-10 inline-block text-[12px] text-foreground/70 hover:text-foreground">
                &larr; Category
            </Link>
            <hr className="hairline mb-6" />
            <p className="mono-eyebrow mb-8 tabular-nums">total {postpost.length}</p>
            <PostListElement posts={postpost} />
        </div>
    );
}

export const generateStaticParams = async () => {
    const categories = getAllCategories();
    // raw values yield the UTF-8 dirs the static export serves;
    // encoded ones are needed for dev mode to match percent-encoded requests
    const cats = new Set(categories.flatMap((c) => [c, encodeURIComponent(c)]));
    return [...cats].map((cat) => ({ cat }));
};

const getPostList = (category: string): PostData[] => {
    const categoryFilteredPageList = fetchedBlogPostList.getByCategory(category).excludeHidden();
    const currentPagePosts = categoryFilteredPageList.getPosts();

    return currentPagePosts;
};
