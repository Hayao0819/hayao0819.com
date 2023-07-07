import "../style/global.css";
import "../style/neumo.css";

import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";

import { H2, H3 } from "@/components/elements/Headlines";
import Link from "@/components/elements/Link";
//import Layout from "@/components/layouts/Layout";
//import { H4 } from "@/components/Headlines/H4";

export function MDX({ children }: { children: ReactNode }) {
    // https://mdxjs.com/advanced/components#mdxprovider

    const [components] = useState({
        h2: (props: any) => {
            return <H2 {...props} />;
        },
        h3: (props: any) => {
            return <H3 {...props} />;
        },
        a: (props: any) => {
            return <Link href={props.href}>{props.children}</Link>;
        },
        ul: (props: any) => {
            return <ul className="list-disc" {...props} />;
        },
    });

    return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <MDX>
                <Component {...pageProps} />
            </MDX>
        </ThemeProvider>
    );
}
