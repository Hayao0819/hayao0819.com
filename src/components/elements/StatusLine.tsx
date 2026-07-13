"use client";

/**
 * StatusLine — the Mono Signature variant's one quirk.
 *
 * A persistent terminal-style status bar pinned bottom-right.
 * Shows: live clock (real JST via Asia/Tokyo), current path, and a
 * vim-style ruler (top/bot/all/NN%). Like a tmux status bar; the small
 * detail that makes the site feel like a "tool" rather than a "blog".
 */

import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { keyboardNavAtom } from "@/components/elements/KeyboardNav";

const jstFormat = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
});

function fmtPath(p: string) {
    if (!p || p === "/") return "~";
    let decoded = p;
    try {
        decoded = decodeURIComponent(p);
    } catch {
        // leave encoded on malformed sequences
    }
    const trimmed = decoded.replace(/\/$/, "");
    if (trimmed.length <= 18) return trimmed;
    // keep the tail (slug) so the chip never grows into the reading column
    const last = trimmed.split("/").pop() ?? "";
    return ("…/" + last).slice(0, 22);
}

export function StatusLine() {
    const pathname = usePathname() ?? "/";
    const [time, setTime] = useState<string | null>(null);
    const [ruler, setRuler] = useState("all");
    // quiet hint that pager keys (j/k, gg/G) are live on this page
    const keynav = useAtomValue(keyboardNavAtom);

    useEffect(() => {
        setTime(jstFormat.format(new Date()));
        const t = setInterval(() => setTime(jstFormat.format(new Date())), 1000);

        let raf = 0;
        const measure = () => {
            raf = 0;
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            // vim ruler semantics: All (fits), Top, Bot, or percentage
            if (max <= 0) {
                setRuler("all");
                return;
            }
            const pct = Math.min(100, Math.max(0, Math.round((doc.scrollTop / max) * 100)));
            setRuler(pct <= 0 ? "top" : pct >= 100 ? "bot" : `${String(pct).padStart(2, "0")}%`);
        };
        const handleScroll = () => {
            if (!raf) raf = requestAnimationFrame(measure);
        };
        measure();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            clearInterval(t);
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <aside className="status-line" aria-hidden="true">
            <div className="status-line__cell">
                <span className="status-line__dot" />
                <span className="status-line__label">hayao0819</span>
            </div>
            <div className="status-line__cell status-line__cell--path">
                <span>{fmtPath(pathname)}</span>
            </div>
            <div className="status-line__cell status-line__cell--secondary">
                <span className="status-line__label">{keynav ? "j/k" : "scroll"}</span>
                <span>{ruler}</span>
            </div>
            <div className="status-line__cell status-line__cell--clock">
                <span className="status-line__label">jst</span>
                <span>{time ?? "--:--:--"}</span>
            </div>
        </aside>
    );
}

export default StatusLine;
