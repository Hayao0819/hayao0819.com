import { Link } from "@/components/elements/Link";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { fetchedBlogPostList } from "@/lib/blog/post";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Tags" });

export default function TagTop() {
    const tags = fetchedBlogPostList.getAllTags();
    return (
        <article>
            <PageMasthead title="Tags" />
            <section className="max-w-article flex flex-wrap items-baseline gap-x-5 gap-y-3">
                {tags.map((tag) => (
                    <Link
                        key={tag}
                        href={`/blog/tag/${tag}`}
                        className="font-display hover:text-accent text-foreground/80 text-base transition-colors md:text-lg"
                    >
                        <span className="text-foreground/50">#</span>
                        {tag}
                    </Link>
                ))}
            </section>
        </article>
    );
}
