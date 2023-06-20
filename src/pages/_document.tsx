import { Html, Head } from "next/document";
import { Main, NextScript } from "next/document";
import Metadata from "../const/meta";

export default function Document() {
    return (
        <Html lang="ja">
            <Head>
                <meta name="description" content={Metadata.description} />
            </Head>
            <body className="overscroll-y-none">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
