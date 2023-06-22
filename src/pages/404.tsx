import { H2 } from "@/components/Headlines";
import Image from "next/image";
import { ReactNode, useState } from "react";
//import { useState } from "react";
import useKonami from "use-konami";
import React from "react";

export default function NotFound() {
    return (
        <>
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

    const GifImage = () => {
        return <Image src="/emoji/partyparrot.gif" alt="PartyParrot" width={32} height={32} />;
    };

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
