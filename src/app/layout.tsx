import "@/style/global.css";
import "@/style/prism.css";

import { Metadata as NextMetadata } from "next";
import React, { ReactNode } from "react";

import Metadata from "../const/meta";
//import BaseColor from "@/components/layouts/BaseColor";

export const metadata: NextMetadata = {
    description: Metadata.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body className="overflow-x-hidden overscroll-y-none">{children}</body>
        </html>
    );
}
