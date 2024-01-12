import Link from "next/link";

import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getAllCategories } from "@/lib/blog/categories";
import { CATEGORY_DESC } from "@/lib/blog/config";

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
    const descList: { [key: string]: string } = CATEGORY_DESC;

    const desc = descList[category] ? descList[category] : "";
    const link = `/blog/category/${category}`;

    return (
        <Link href={link} className="m-4 flex flex-col p-4">
            <div className="text-xl text-accent">{category}</div>
            <div>{desc}</div>
        </Link>
    );
};
