import "../style/global.css";
import "../style/neumo.css";

import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Component {...pageProps} />
        </>
    );
}
