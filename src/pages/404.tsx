import { ReactNode, useState } from "react";
import React from "react";
//import { useState } from "react";
import useKonami from "use-konami";

import { H2 } from "@/components/elements/Headlines";
import GifImage from "@/components/elements/PartyParrot";
import Title from "@/components/elements/Title";
import Layout from "@/components/layouts/Layout";

export default function NotFound() {
    return (
        <Layout>
            <Title title="404" />
            <PartyParrot>
                <H2>404 Not Found</H2>
            </PartyParrot>
            <PartyParrot>
                <p>内容が無いようです。</p>
            </PartyParrot>
        </Layout>
    );
}

function PartyParrot({ children }: { children: ReactNode }) {
    const [konami, changeKonami] = useState(false);
    useKonami({
        onUnlock: () => {
            changeKonami(!konami);
        },
    });

    if (konami) {
        return (
            <div className="flex items-center">
                <GifImage />
                {children}
                <GifImage />
            </div>
        );
    } else {
        return <>{children}</>;
    }
}
