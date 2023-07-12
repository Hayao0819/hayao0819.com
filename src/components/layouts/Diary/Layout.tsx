import { ReactNode } from "react";

import Layout from "../Layout";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return <Layout>{children}</Layout>;
}
