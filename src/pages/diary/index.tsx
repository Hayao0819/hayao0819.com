import fs from "fs";
import path from "path";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";

import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";
import BlogLayout from "@/components/layouts/blog/BlogLayout";
import DiaryPreview from "@/components/layouts/DiaryPreview";

export default function DiaryIndex({ diaryPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <BlogLayout>
            {diaryPreviews.map((diaryPreview, i) => {
                return (
                    <div key={i}>
                        <DiaryPreview diaryPreview={diaryPreview} />
                    </div>
                );
            })}
        </BlogLayout>
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
