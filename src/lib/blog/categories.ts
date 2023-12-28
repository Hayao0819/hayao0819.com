import { getAllPosts } from "../markdown/postlist";
import { CATEGORY_INFO } from "./config";

export const getAllCategories = () => {
    const posts = getAllPosts();
    const categories = posts
        .flatMap((post) => {
            const categories = post.meta.categories;
            if (categories) {
                return categories;
            } else {
                return [];
            }
        })
        .filter((category) => category);

    return [...new Set(categories)];
};

export const findCategoryInfo = (category: string) => {
    const catingo: { jp: string; url: string; desc: string }[] = getCategoryInfo();
    return catingo.filter((c) => c.url === category || c.jp === category)[0];
};

export const getCategoryInfo = () => {
    return CATEGORY_INFO;
};
