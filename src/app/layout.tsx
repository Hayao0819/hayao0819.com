import "@/style/global.css";

import { ViewTransitions } from "@hayao/next-view-transitions";
import { Metadata as NextMetadata } from "next";
import React, { ReactNode, Suspense } from "react";

import GoogleAnalytics from "@/components/elements/GoogleAnalytics";
import { genMetaData } from "@/lib/meta";

export const metadata: NextMetadata = genMetaData();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html className="scroll-smooth" lang="ja" data-theme="mono" suppressHydrationWarning>
            <head>
                <meta name="google-adsense-account" content="ca-pub-3718986298951255" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Suspense>
                    <GoogleAnalytics />
                </Suspense>
            </head>
            <body className="font-gothic overscroll-y-none" suppressHydrationWarning>
                <ViewTransitions>{children}</ViewTransitions>
            </body>
        </html>
    );
}
