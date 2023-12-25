import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getAllCategories } from "@/lib/blog/categories";

export default function CategoryTop() {
    const categories = getAllCategories();
    return (
        <CommonSpacer>
            {categories.map((c) => {
                return <Category key={c} category={c} />;
            })}
        </CommonSpacer>
    );
}

const Category = ({ category }: { category: string }) => {
    return <div>{category}</div>;
};
