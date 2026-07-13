import { ReactNode } from "react";

import StatusLine from "@/components/elements/StatusLine";
import Layout from "@/components/layouts/Layout";
import PageShell from "@/components/layouts/PageShell";

export default function HayaoLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Layout>
                <PageShell>{children}</PageShell>
            </Layout>
            <StatusLine />
        </>
    );
}
