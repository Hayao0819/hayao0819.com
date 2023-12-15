import { ReactNode } from "react";

import Layout from "@/components/layouts/Layout";

export default function HayaoLayout({ children }: { children: ReactNode }) {
    return <Layout className="h-screen">{children}</Layout>;
}
