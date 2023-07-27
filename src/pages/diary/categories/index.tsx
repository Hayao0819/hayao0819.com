import { InferGetStaticPropsType } from "next";

//import path from "path";
//import Btn from "@/components/elements/Btn";
import Link from "@/components/elements/Link";
import Layout from "@/components/layouts/Layout";
import { getAllPosts } from "@/libs/blog";

export default function DiaryIndex({ diaryPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
    const categories: string[] = [];
    diaryPreviews.forEach((p) => {
        if (p.categories) {
            if (Array.isArray(p.categories)) {
                for (const c of p.categories) {
                    if (!categories.includes(c)) {
                        categories.push(c);
                    }
                }
                //categories.push(...p.categories);
            } else {
                if (!categories.includes(p.categories)) {
                    categories.push(p.categories);
                }
            }
        }
    });

    return (
        <Layout>
            <ul className="list-disc">
                {categories.map((category, i) => {
                    return (
                        <li key={i}>
                            <Link href={"/diary/categories/" + category}>{category}</Link>
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
}

export async function getStaticProps() {
    return await getAllPosts();
}
