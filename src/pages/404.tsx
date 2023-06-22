import { H2 } from "@/components/Headlines";
import Image from "next/image";
import { ReactNode, useState } from "react";
//import { useState } from "react";
import useKonami from "use-konami";

export default function NotFound() {
    return (
        <>
            <div>
                <PartyParrot>
                    <H2>404 Not Found</H2>
                </PartyParrot>
                <PartyParrot>
                    <p>内容が無いようです。</p>
                </PartyParrot>
            </div>
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
                <Image src="/emoji/partyparrot.gif" alt="PartyParrot" width={32} height={32} />
                {children}
                <Image src="/emoji/partyparrot.gif" alt="PartyParrot" width={32} height={32} />
            </div>
        );
    }else{
        return <>{children}</>;
    }
}
