import "@/style/global.css";

import { ViewTransitions } from "@hayao/next-view-transitions";
import { Metadata as NextMetadata } from "next";
import React, { ReactNode, Suspense } from "react";

import GoogleAnalytics from "@/components/elements/GoogleAnalytics";
import { genMetaData } from "@/lib/meta";

export const metadata: NextMetadata = genMetaData();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html className="overflow-x-scroll scroll-smooth md:overflow-x-auto" lang="ja">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <Suspense>
                    <GoogleAnalytics />
                </Suspense>
            </head>
            <body className="overscroll-y-none">
                <ViewTransitions>{children}</ViewTransitions>
            </body>
        </html>
    );
}
