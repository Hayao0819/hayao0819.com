import fs from "fs";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";

//import path from "path";
import DiaryPreview from "@/components/layouts/Diary/Preview";
import Layout from "@/components/layouts/Layout";
import { GetListDirFiles, MDXPathToURL } from "@/libs/blog";
import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";

export default function DiaryIndex({ diaryPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <div className="flex flex-wrap items-stretch">
                {diaryPreviews.map((diaryPreview, i) => {
                    return (
                        <div key={i} className="flex w-1/2">
                            <DiaryPreview diaryPreview={diaryPreview} />
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    // get all MDX files
    const postFilePaths = GetListDirFiles("diaries");

    const diaryPreviews: DiaryPreviewType[] = [];

    // read the frontmatter for each file
    for (const diaryFilePath of postFilePaths) {
        const diaryFile = fs.readFileSync(`${diaryFilePath}`, "utf8");

        // serialize the MDX content to a React-compatible format
        // and parse the frontmatter
        const serializedPost = await serialize(diaryFile, {
            parseFrontmatter: true,
        });

        if ((serializedPost.frontmatter.hide as boolean) || (serializedPost.frontmatter.hide as string) == "true") {
            continue;
        }
        diaryPreviews.push({
            ...serializedPost.frontmatter,
            // add the slug to the frontmatter info
            //slug: diaryFilePath.replace("index.mdx", "").replace(".mdx", "").replace("diaries/", ""),
            slug: MDXPathToURL(diaryFilePath)
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
