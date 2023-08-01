import { Head, Html } from "next/document";
import { Main, NextScript } from "next/document";

import Metadata from "../const/meta";
//import BaseColor from "@/components/layouts/BaseColor";

export default function Document() {
    return (
        <Html lang="ja">
            <Head>
                <meta name="description" content={Metadata.description} />
            </Head>
            <div className="overflow-hidden">
            <body className="overscroll-y-none">
                <Main />
                <NextScript />
            </body>
            </div>
        </Html>
    );
}
