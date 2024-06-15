"use client";

import { useEffect, useState } from "react";

export default function Niconico() {
    const [info, setInfo] = useState<string>();

    useEffect(() => {
        (async () => {
            const res = await fetch("https://nicorekari.nanasi-rasi.net/DB.json", {});
            if (!res.ok) {
                setInfo(res.statusText);
                throw new Error(res.statusText);
                return;
            }
            const json = await res.json();
            setInfo(json);
        })();
    }, []);

    return <>{JSON.stringify(info)}</>;
}
