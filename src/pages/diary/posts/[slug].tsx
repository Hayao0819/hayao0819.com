// pages/[slug].ts
import fs from "fs";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
/*
import Link from "next/link";
import { useRouter } from "next/router";
*/
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";

//import { BlogTitle } from "@/components/elements/Headlines/H2";
//import { H2 } from "@/components/elements/Headlines/H2";
/*
import { H1 } from "@/components/elements/Headlines/H1";

import { P } from "@/components/elements/Paragraph";*/
import BlogLayout from "@/components/layouts/Diary/Layout";
import MarkdownElements from "@/libs/mdx";

export default function PostPage({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
    const AdditionalElements = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //h2: (props: any) => {
        //    return <BlogTitle {...props} />;
        //},
    };

    const elements = { ...MarkdownElements, ...AdditionalElements };

    return (
        <div>
            <Head>
                <title>{source.frontmatter.title as string}</title>
            </Head>
            <BlogLayout source={source}>
                <MDXRemote
                    {...source}
                    // specifying the custom MDX components
                    components={elements}
                />
            </BlogLayout>
        </div>
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
    const filePath = `diaries/${slug}.mdx`;

    // 存在チェック
    let isExist = true;
    try {
        fs.statSync(filePath);
    } catch (e) {
        isExist = false;
    }
    if (!isExist) {
        return {
            notFound: true,
        };
    }

    // retrieve the MDX blog post file associated
    // with the specified slug parameter
    const diaryFile: Buffer = fs.readFileSync(filePath);
    // read the MDX serialized content along with the frontmatter
    // from the .mdx blog post file
    const mdxSource = await serialize(diaryFile, { parseFrontmatter: true });

    return {
        props: {
            source: mdxSource,
        },
        // enable ISR
        revalidate: 60,
    };
}
