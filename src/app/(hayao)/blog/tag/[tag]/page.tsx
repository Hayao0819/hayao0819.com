import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { PostList as PostListElement } from "@/components/layouts/blog/PostPreviewList";
import { fetchedBlogPostList } from "@/lib/blog/post";
import type { PostData } from "@/lib/markdown/post";

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params;
    const tagName = decodeURIComponent(params.tag);
    const posts = getPostList(decodeURIComponent(params.tag));

    return (
        <div>
            <header className="mb-8">
                <PromptLine path="~/blog/tag">ls {tagName}/</PromptLine>
                <h1 className="mt-4 font-body-prose text-3xl leading-tight tracking-tight">#{tagName}</h1>
            </header>
            <Link href="/blog/tag" className="mb-10 inline-block text-[12px] text-foreground/70 hover:text-foreground">
                &larr; Tags
            </Link>
            <hr className="hairline mb-6" />
            <p className="mono-eyebrow mb-8 tabular-nums">total {posts.length}</p>
            <PostListElement posts={posts} />
        </div>
    );
}

export const generateStaticParams = async () => {
    const tags = fetchedBlogPostList.getAllTags();
    // raw + encoded for the same reason as the category page
    const all = new Set(tags.flatMap((t) => [t, encodeURIComponent(t)]));
    return [...all].map((tag) => ({ tag }));
};

const getPostList = (tag: string): PostData[] => {
    return fetchedBlogPostList.getByTag(tag).excludeHidden().getPosts();
};
