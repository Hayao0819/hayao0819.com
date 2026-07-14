import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { findCategoryInfo, getAllCategories } from "@/lib/blog/categories";
import { fetchedBlogPostListWithoutHidden } from "@/lib/blog/post";

export default function CategoryTop() {
    const categories = getAllCategories().filter((c) => c !== "ブログ");
    return (
        <div>
            <header className="mb-10">
                <PromptLine path="~/blog/category">ls</PromptLine>
                <h1 className="mt-4 font-body-prose text-3xl leading-tight tracking-tight">Category</h1>
            </header>
            <hr className="hairline mb-2" />
            <ul className="flex flex-col">
                {categories.map((c, i) => {
                    const info = findCategoryInfo(c);
                    const desc = info?.desc ?? "";
                    const count = fetchedBlogPostListWithoutHidden.getByCategory(c).getPosts().length;
                    return (
                        <li key={c}>
                            {i > 0 && <hr className="hairline" />}
                            <Link href={`/blog/category/${c}`} className="group block py-5">
                                <div className="flex items-baseline justify-between gap-4">
                                    <span className="font-body-prose font-medium text-[18px] text-foreground group-hover:text-accent">
                                        {c}
                                    </span>
                                    <span className="text-[11px] text-foreground/65 tabular-nums tracking-[0.14em]">
                                        {String(count).padStart(2, "0")} posts
                                    </span>
                                </div>
                                {desc && <p className="mt-1 font-body-prose text-[16px] text-foreground/70">{desc}</p>}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
