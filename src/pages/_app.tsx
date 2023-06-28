import type { AppProps } from "next/app";
import "../style/global.css";
import Layout from "@/components/Layout";
import { MDXProvider } from "@mdx-js/react";
import { H2, H3 } from "@/components/Headlines";
import { ReactNode, useState } from "react";
//import { H4 } from "@/components/Headlines/H4";

export function MDX({ children }: {children: ReactNode}) {
    // https://mdxjs.com/advanced/components#mdxprovider

    const [components, ] = useState({
        h2: (props: any) => {
            return <H2 {...props} />;
        },
        h3: (props: any) => {
            return <H3 {...props} />;
        },
    });

    return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <MDX>
                <Component {...pageProps} />
            </MDX>
        </Layout>
    );
}
