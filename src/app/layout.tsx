import "@/style/global.css";
import "@/style/prism.css";

import { Metadata as NextMetadata } from "next";
import React, { ReactNode } from "react";

import GoogleAnalytics from "@/components/elements/GoogleAnalytics";

import Metadata from "../const/meta";
//import BaseColor from "@/components/layouts/BaseColor";

export const metadata: NextMetadata = {
    metadataBase: new URL("https://www.hayao0819.com"),
    title: Metadata.title,
    description: Metadata.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html className="overflow-x-scroll md:overflow-x-auto" lang="ja">
            <head>
                <GoogleAnalytics />
            </head>
            <body className="overflow-x-hidden overscroll-y-none">{children}</body>
        </html>
    );
}
