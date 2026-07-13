import "@/style/global.css";

import { ViewTransitions } from "@hayao/next-view-transitions";
import { Metadata as NextMetadata } from "next";
import React, { ReactNode, Suspense } from "react";

import GoogleAnalytics from "@/components/elements/GoogleAnalytics";
import { genMetaData } from "@/lib/meta";

export const metadata: NextMetadata = genMetaData();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html className="motion-safe:scroll-smooth" lang="ja" data-theme="mono" suppressHydrationWarning>
            <head>
                <meta name="google-adsense-account" content="ca-pub-3718986298951255" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700;900&display=swap"
                    rel="stylesheet"
                />
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
