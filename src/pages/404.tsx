import { H2 } from "@/components/Headlines";
import GifImage from "@/components/PartyParrot";
import { ReactNode, useState } from "react";
//import { useState } from "react";
import useKonami from "use-konami";
import React from "react";
import Title from "@/components/Title";

export default function NotFound() {
    return (
        <>
            <Title title="404"/>
            <PartyParrot>
                <H2>404 Not Found</H2>
            </PartyParrot>
            <PartyParrot>
                <p>内容が無いようです。</p>
            </PartyParrot>
        </>
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
