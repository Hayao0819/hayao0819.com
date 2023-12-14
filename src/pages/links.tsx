import { useState } from "react";

import Layout from "@/components/layouts/Layout";

export default function Links() {
    const [hoge, changeHoge] = useState(0);

    const increment = () => {
        changeHoge(hoge + 1);
    };

    return (
        <Layout>
            <div onClick={increment}>links</div>
            <div>{hoge}</div>
        </Layout>
    );
}
