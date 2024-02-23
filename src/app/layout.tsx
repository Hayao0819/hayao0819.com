import "@/style/global.css";
import "@/style/prism.css";

import { Metadata as NextMetadata } from "next";
import React, { ReactNode, Suspense } from "react";

import GoogleAnalytics from "@/components/elements/GoogleAnalytics";
import { genMetaData } from "@/lib/meta";

export const metadata: NextMetadata = genMetaData();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html className="overflow-x-scroll md:overflow-x-auto" lang="ja">
            <head>
                <Suspense>
                    <GoogleAnalytics />
                </Suspense>
            </head>
            <body className="overflow-x-hidden overscroll-y-none">{children}</body>
        </html>
    );
}
