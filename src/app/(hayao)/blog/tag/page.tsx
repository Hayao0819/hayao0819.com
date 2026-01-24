import { Link } from "@/components/elements/Link";
import { fetchedBlogPostList } from "@/lib/blog/post";

export default function TagTop() {
    const tags = fetchedBlogPostList.getAllTags();
    return (
        <div className="border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">Tags</h1>
                <div className="flex flex-wrap gap-2 p-4">
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/blog/tag/${tag}`}
                            className="border border-base-content px-3 py-1 text-sm hover:bg-base-content hover:text-base-100"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
