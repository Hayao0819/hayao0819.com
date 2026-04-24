import { Link } from "@/components/elements/Link";
import { findCategoryInfo, getAllCategories } from "@/lib/blog/categories";

export default function CategoryTop() {
    const categories = getAllCategories().filter((c) => c !== "ブログ");
    return (
        <div className="border-border flex w-full border-4">
            <h1 className="border-border hidden self-stretch border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                Category
            </h1>
            <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">Category</h1>
            <div className="flex min-w-0 flex-1 flex-col">
                {categories.map((c, i) => (
                    <Category key={c} category={c} isLast={i === categories.length - 1} />
                ))}
            </div>
        </div>
    );
}

const Category = ({ category, isLast }: { category: string; isLast: boolean }) => {
    const catInfo = findCategoryInfo(category);
    const desc = catInfo ? catInfo.desc : "";
    const link = `/blog/category/${category}`;

    return (
        <Link
            href={link}
            className={`hover:bg-foreground/5 flex flex-col p-4 transition-colors ${isLast ? "" : "border-border/30 border-b"}`}
        >
            <div className="font-bold">{category}</div>
            <div className="text-foreground/60 text-sm">{desc}</div>
        </Link>
    );
};
