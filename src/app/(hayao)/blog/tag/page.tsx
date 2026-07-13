import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { fetchedBlogPostList } from "@/lib/blog/post";

export default function TagTop() {
    const tags = fetchedBlogPostList.getAllTags();
    return (
        <div>
            <header className="mb-10">
                <PromptLine path="~/blog/tag">ls</PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight">Tags</h1>
            </header>
            <hr className="hairline mb-10" />
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
                {tags.map((tag) => (
                    <li key={tag}>
                        <Link href={`/blog/tag/${tag}`} className="text-foreground/75 hover:text-accent">
                            #{tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
