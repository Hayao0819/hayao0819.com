import { Link } from "@/components/elements/Link";
import { fetchedBlogPostList } from "@/lib/blog/post";

export default function TagTop() {
    const tags = fetchedBlogPostList.getAllTags();
    return (
        <div className="border-border w-full border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                    Tags
                </h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">Tags</h1>
                <div className="flex flex-wrap gap-2 p-4">
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/blog/tag/${tag}`}
                            className="bg-foreground/5 hover:bg-foreground hover:text-background rounded-sm px-3 py-1.5 text-sm transition-colors"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
