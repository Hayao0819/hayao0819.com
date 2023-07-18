import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode } from "react";

import { H2 } from "@/components/elements/Headlines";

import Layout from "../Layout";
//import BlogMeta from "./Meta";

export default function BlogLayout({ children, source }: { children: ReactNode; source: MDXRemoteSerializeResult }) {
    return (
        <Layout>
            <H2>{source.frontmatter.title as string}</H2>
            {/*<BlogMeta source={source} />*/}
            {children}
        </Layout>
    );
}
