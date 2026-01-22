import { Link } from "@/components/elements/Link";
import { findCategoryInfo, getAllCategories } from "@/lib/blog/categories";

export default function CategoryTop() {
    const categories = getAllCategories().filter((c) => c !== "ブログ");
    return (
        <div className="border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">Category</h1>
                <div className="flex flex-col">
                    {categories.map((c, i) => (
                        <Category key={c} category={c} isLast={i === categories.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const Category = ({ category, isLast }: { category: string; isLast: boolean }) => {
    const catInfo = findCategoryInfo(category);
    const desc = catInfo ? catInfo.desc : "";
    const link = `/blog/category/${category}`;

    return (
        <Link href={link} className={`flex flex-col p-4 ${isLast ? "" : "border-b-4 border-base-content"}`}>
            <div className="font-bold">{category}</div>
            <div className="text-sm">{desc}</div>
        </Link>
    );
};
