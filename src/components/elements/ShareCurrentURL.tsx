"use client";

import { useEffect, useState } from "react";

import ShareBtns from "./ShareBtns";

export const ShareCurrentURL = ({ text }: { text?: string }) => {
    const [url, setUrl] = useState("");
    useEffect(() => {
        setUrl(window.location.href);
    }, [window.location.href]);
    return <ShareBtns url={url} text={text} />;
};
