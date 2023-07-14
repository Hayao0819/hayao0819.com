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

import { H1 } from "@/components/elements/Headlines/H1";
import { H2 } from "@/components/elements/Headlines/H2";
import { P } from "@/components/elements/Paragraph";
import BlogLayout from "@/components/layouts/Diary/Layout";

export default function PostPage({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <Head>
                <title>{source.frontmatter.title as string}</title>
            </Head>
            <BlogLayout>
                <MDXRemote
                    {...source}
                    // specifying the custom MDX components
                    components={{
                        h1: H1,
                        h2: H2,
                        p: P,
                    }}
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
        //なぜか動かない
        //useRouter().replace("/404")

      // それでは!!!
      return {
        notFound: true,
      }
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
