import React from "react";

import { PageContainer } from "@/components/elements/PageContainer";
import { PageMasthead } from "@/components/elements/PageMasthead";
import Layout from "@/components/layouts/Layout";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "404 Page Not Found" });

export default function NotFound() {
    return (
        <Layout>
            <PageContainer>
                <PageMasthead title="404 Page Not Found" lede="内容が無いようです。" />
            </PageContainer>
        </Layout>
    );
}
