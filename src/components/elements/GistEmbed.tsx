"use client";

import { useEffect, useRef, useState } from "react";

// Gist embed scripts rely on document.write, which mutates the server-rendered
// DOM before hydration and breaks it — run them isolated in an iframe instead.
// The gist stylesheet finishes loading after the iframe's load event, so the
// frame reports later height changes itself via postMessage; the parent also
// measures directly on mount/load since the first report can beat hydration.
export default function GistEmbed({ src }: { src: string }) {
    const ref = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState<number>();

    const measure = () => {
        const doc = ref.current?.contentDocument;
        if (doc?.body) setHeight(doc.documentElement.scrollHeight);
    };

    useEffect(() => {
        measure();
        const onMessage = (e: MessageEvent) => {
            const data = e.data as { gistHeight?: unknown };
            if (ref.current && e.source === ref.current.contentWindow && typeof data?.gistHeight === "number") {
                setHeight(data.gistHeight);
            }
        };
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    const srcDoc =
        `<html><head><base target="_parent"></head><body style="margin:0">` +
        `<script src="${src}"></script>` +
        `<script>new ResizeObserver(function () { parent.postMessage({ gistHeight: document.documentElement.scrollHeight }, "*"); }).observe(document.body);</script>` +
        `</body></html>`;

    return (
        <iframe
            ref={ref}
            srcDoc={srcDoc}
            title="GitHub Gist"
            className="my-8 w-full border-0"
            style={{ height }}
            onLoad={measure}
        />
    );
}
