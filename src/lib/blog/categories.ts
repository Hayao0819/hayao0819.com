import { getAllPosts } from "./postlist";

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
