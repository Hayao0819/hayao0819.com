import React from "react";

import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import Layout from "@/components/layouts/Layout";

//import { useState } from "react";

export default function NotFound() {
    return (
        <Layout>
            <CommonSpacer>
                <Heading level={2}>404 Page Not Found </Heading>
                <p>内容が無いようです。</p>
            </CommonSpacer>
        </Layout>
    );
}
