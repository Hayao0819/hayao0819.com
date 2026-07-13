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
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight">Category</h1>
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
                                    <span className="font-body-prose text-foreground group-hover:text-accent text-[18px] font-medium">
                                        {c}
                                    </span>
                                    <span className="text-foreground/65 text-[11px] tracking-[0.14em] tabular-nums">
                                        {String(count).padStart(2, "0")} posts
                                    </span>
                                </div>
                                {desc && <p className="font-body-prose text-foreground/70 mt-1 text-[16px]">{desc}</p>}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
