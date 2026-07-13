import React from "react";

import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import StatusLine from "@/components/elements/StatusLine";
import Layout from "@/components/layouts/Layout";
import PageShell from "@/components/layouts/PageShell";

export default function NotFound() {
    return (
        <>
            <Layout>
                <PageShell>
                    <PromptLine>cat ./404</PromptLine>
                    <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight md:text-4xl">404 Page Not Found</h1>
                    <p className="text-foreground/70 mt-6 text-[13px]">内容が無いようです。</p>
                    <p className="mt-8 text-[13px]">
                        <Link href="/" className="link-ai">
                            Top &rarr;
                        </Link>
                    </p>
                </PageShell>
            </Layout>
            <StatusLine />
        </>
    );
}
