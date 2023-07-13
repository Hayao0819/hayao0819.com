import fs from "fs";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

import Layout from "@/components/layouts/Diary/Layout";
//import DiaryPreview from "@/components/layouts/Diary/Preview";
import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";

export default function DiaryIndex({ diaryPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
    const categories: string[] = [];
    diaryPreviews.forEach((p) => {
        if (p.categories) {
            if (Array.isArray(p.categories)) {
                categories.push(...p.categories);
            } else {
                categories.push(p.categories);
            }
        }
    });

    return (
        <Layout>
            <ul className="list-disc">
                {categories.map((category, i) => {
                    return <li key={i}>{category}</li>;
                })}
            </ul>
        </Layout>
    );
}

export async function getStaticProps() {
    // get all MDX files
    const postFilePaths = fs.readdirSync("diaries").filter((postFilePath) => {
        return path.extname(postFilePath).toLowerCase() === ".mdx";
    });

    const diaryPreviews: DiaryPreviewType[] = [];

    // read the frontmatter for each file
    for (const diaryFilePath of postFilePaths) {
        const diaryFile = fs.readFileSync(`diaries/${diaryFilePath}`, "utf8");

        // serialize the MDX content to a React-compatible format
        // and parse the frontmatter
        const serializedPost = await serialize(diaryFile, {
            parseFrontmatter: true,
        });

        diaryPreviews.push({
            ...serializedPost.frontmatter,
            // add the slug to the frontmatter info
            slug: diaryFilePath.replace(".mdx", ""),
        } as DiaryPreviewType);
    }

    return {
        props: {
            diaryPreviews: diaryPreviews,
        },
        // enable ISR
        revalidate: 60,
    };
}
