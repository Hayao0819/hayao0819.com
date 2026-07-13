import { Link } from "@/components/elements/Link";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { findCategoryInfo, getAllCategories } from "@/lib/blog/categories";

export default function CategoryTop() {
    const categories = getAllCategories().filter((c) => c !== "ブログ");

    return (
        <article>
            <PageMasthead title="Category" />

            <section className="max-w-article">
                {categories.map((c) => {
                    const info = findCategoryInfo(c);
                    return (
                        <Link key={c} href={`/blog/category/${c}`} className="group block">
                            <div className="border-foreground/10 border-t py-10 first:border-t-0 md:py-12">
                                <h2 className="font-display group-hover:text-accent break-phrase text-xl leading-[1.2] font-bold tracking-tight transition-colors md:text-2xl">
                                    {c}
                                </h2>
                                {info?.desc && (
                                    <p className="font-serif-jp text-foreground/75 mt-3 max-w-[46ch] text-base leading-[1.8]">
                                        {info.desc}
                                    </p>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </section>
        </article>
    );
}
