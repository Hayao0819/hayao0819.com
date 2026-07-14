import "@/style/global.css";

import { ViewTransitions } from "@hayao/next-view-transitions";
import type { Metadata as NextMetadata } from "next";
import { type ReactNode, Suspense } from "react";

import GoogleAnalytics from "@/components/elements/GoogleAnalytics";
import { genMetaData } from "@/lib/meta";

export const metadata: NextMetadata = genMetaData();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            className="motion-safe:scroll-smooth"
            lang="ja"
            data-theme="mono"
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <head>
                <meta name="google-adsense-account" content="ca-pub-3718986298951255" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* Variant E — Mono Signature: web fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif+JP:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
                {process.env.NODE_ENV === "production" && (
                    <Suspense>
                        <GoogleAnalytics />
                    </Suspense>
                )}
            </head>
            <body className="overscroll-y-none pb-10" suppressHydrationWarning>
                <a
                    href="#main"
                    data-skip-link
                    className="sr-only font-mono-chrome focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:border focus:border-foreground/25 focus:bg-background focus:px-4 focus:py-2 focus:text-[12px] focus:tracking-[0.14em]"
                >
                    skip to content
                </a>
                <ViewTransitions>{children}</ViewTransitions>
            </body>
        </html>
    );
}
