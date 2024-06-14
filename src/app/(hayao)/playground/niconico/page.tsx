"use client";

import { useEffect, useState } from "react";

export default function Niconico() {
    const [info, setInfo] = useState({});

    useEffect(() => {
        (async () => {
            const data = await fetch("https://nicorekari.nanasi-rasi.net/DB.json", {
                mode: "no-cors",
            });
            const json = await data.json();
            setInfo(json);
        })();
    }, []);

    return <>{JSON.stringify(info)}</>;
}
