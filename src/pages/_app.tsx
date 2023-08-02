import "../style/global.css";
import "../style/neumo.css";
import "@/style/prism-atom-dark.css";

import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";

import { ModalProvider } from "@/components/elements/ModalContext";
import MarkdownElements from "@/libs/mdx";

/*
import { H3 } from "@/components/elements/Headlines";
import { BlogTitle } from "@/components/elements/Headlines/H2";
import Link from "@/components/elements/Link";
*/
//import Layout from "@/components/layouts/Layout";
//import { H4 } from "@/components/Headlines/H4";

export function MDX({ children }: { children: ReactNode }) {
    // https://mdxjs.com/advanced/components#mdxprovider

    const [components] = useState(MarkdownElements);

    return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <ModalProvider>
                <ThemeProvider attribute="class" defaultTheme="light">
                    <MDX>
                        <Component {...pageProps} />
                    </MDX>
                </ThemeProvider>
            </ModalProvider>
        </>
    );
}
