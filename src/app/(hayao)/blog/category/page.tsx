import { Link } from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { findCategoryInfo, getAllCategories } from "@/lib/blog/categories";

export default function CategoryTop() {
    const categories = getAllCategories();
    return (
        <CommonSpacer>
            <div className="flex flex-col">
                {categories
                    .filter((c) => c !== "ブログ")
                    .map((c) => {
                        return <Category key={c} category={c} />;
                    })}
            </div>
        </CommonSpacer>
    );
}

const Category = ({ category }: { category: string }) => {
    const catInfo = findCategoryInfo(category);

    const desc = catInfo ? catInfo.desc : "";
    const link = `/blog/category/${category}`;

    return (
        <Link href={link} className="m-4 flex flex-col p-4">
            <div className="text-xl text-accent">{category}</div>
            <div>{desc}</div>
        </Link>
    );
};
