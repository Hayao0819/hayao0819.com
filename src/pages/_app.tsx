import "../style/global.css";
import "../style/neumo.css";

import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";

import MarkdownElements from "@/libs/mdx";
import { ModalProvider } from "@/components/elements/ModalContext";

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
        <ModalProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
                <MDX>
                    <Component {...pageProps} />
                </MDX>
            </ThemeProvider>
        </ModalProvider>
    );
}
