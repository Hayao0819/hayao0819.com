import { InferGetStaticPropsType } from "next";

//import path from "path";
import DiaryPreview from "@/components/layouts/Diary/Preview";
import Layout from "@/components/layouts/Layout";
import { getAllPosts } from "@/libs/blog";

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
    return await getAllPosts();
}
