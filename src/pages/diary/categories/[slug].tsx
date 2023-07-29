import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import NextLink from "next/link";
import React from "react";

import Btn from "@/components/elements/Btn";
import DiaryPreview from "@/components/layouts/Diary/Preview";
import Layout from "@/components/layouts/Layout";
import { getAllPosts } from "@/libs/blog";
import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";

export default function DiaryIndex({ categoryPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <div className="flex flex-wrap items-stretch">
                {categoryPreviews.map((categoryPreview, i) => {
                    return (
                        <div key={i} className="flex w-1/2">
                            <DiaryPreview diaryPreview={categoryPreview} />
                        </div>
                    );
                })}
            </div>
            <div className="text-center">
                <NextLink href="/diary/categories">
                    <Btn>カテゴリ一覧に戻る</Btn>
                </NextLink>
            </div>
        </Layout>
    );
}
export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(
    ctx: GetStaticPropsContext<{
        slug: string;
    }>,
) {
    const { slug } = ctx.params!;
    const pages = await getAllPosts();
    const categoryPreviews: DiaryPreviewType[] = pages.props.diaryPreviews.filter((e) => {
        return e.categories.includes(slug);
    });

    return {
        props: {
            categoryPreviews: categoryPreviews,
        },
        revalidate: 60,
    };
}
