import "../style/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { StrictMode } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StrictMode>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Component {...pageProps} />
        </StrictMode>
    );
}
