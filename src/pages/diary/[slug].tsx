// pages/[slug].ts
import fs from "fs";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { H1 } from "@/components/elements/Headlines/H1";
import { H2 } from "@/components/elements/Headlines/H2";
import { P } from "@/components/elements/Paragraph";

export default function PostPage({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <Head>
                <title>{source.frontmatter.title as string}</title>
            </Head>
            <>
                <Link href="/diary">
                    <h4>Back</h4>
                </Link>

                <MDXRemote
                    {...source}
                    // specifying the custom MDX components
                    components={{
                        h1: H1,
                        h2: H2,
                        p: P,
                    }}
                />
            </>
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

    // retrieve the MDX blog post file associated
    // with the specified slug parameter
    const diaryFile = fs.readFileSync(`diaries/${slug}.mdx`);

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
