import { InferGetStaticPropsType } from "next";

import DiaryPreview from "@/components/layouts/Diary/Preview";
import Layout from "@/components/layouts/Layout";

import { getStaticProps } from "../diary/index";

export default function Categories({ diaryPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            {diaryPreviews.map((diaryPreview, i) => {
                
                return (
                    <div key={i}>
                        <DiaryPreview diaryPreview={diaryPreview} />
                    </div>
                );
            })}
        </Layout>
    );
}
