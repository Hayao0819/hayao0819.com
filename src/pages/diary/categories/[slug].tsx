// pages/[slug].ts
import fs from "fs";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
//import Head from "next/head";
/*
import Link from "next/link";
import { useRouter } from "next/router";
*/
//import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import React from "react";

/*
import { H1 } from "@/components/elements/Headlines/H1";
import { H2 } from "@/components/elements/Headlines/H2";
import { P } from "@/components/elements/Paragraph";
*/
import DiaryPreview from "@/components/layouts/Diary/Preview";
import Layout from "@/components/layouts/Layout";
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
export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(
    ctx: GetStaticPropsContext<{
        slug: string;
    }>,
) {
    const { slug } = ctx.params!;
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

        if ((serializedPost.frontmatter.categories as string[]).includes(slug) || (serializedPost.frontmatter.categories as string) == slug ){
        diaryPreviews.push({
            ...serializedPost.frontmatter,
            // add the slug to the frontmatter info
            slug: diaryFilePath.replace(".mdx", ""),
        } as DiaryPreviewType);
    }
    }

    return {
        props: {
            diaryPreviews: diaryPreviews,
        },
        // enable ISR
        revalidate: 60,
    };
}
