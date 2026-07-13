"use client";

import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";

/** True while a page with pager-style keyboard navigation is mounted —
 *  the StatusLine swaps its ruler label to the `j/k` hint. */
export const keyboardNavAtom = atom(false);

const LINE_STEP = 96;

const isTypingContext = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    if (target.isContentEditable) return true;
    return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
};

/**
 * Pager keys on article pages: j/k scroll by a line-step, gg jumps to
 * top, G to bottom — like less/vim. Never fires in typing contexts or
 * with modifier chords; smooth only when the user allows motion.
 */
export default function KeyboardNav() {
    const setActive = useSetAtom(keyboardNavAtom);

    useEffect(() => {
        setActive(true);

        let lastG = 0;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.defaultPrevented || isTypingContext(e.target)) return;
            // WCAG 2.1.4: single-char shortcuts only act when nothing is focused,
            // so dictated words can't trigger scrolls while operating a control
            const active = document.activeElement;
            if (active && active !== document.body && active !== document.documentElement) return;

            // "instant", not "auto" — auto defers to the CSS smooth value
            const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";

            switch (e.key) {
                case "j":
                    window.scrollBy({ top: LINE_STEP, behavior });
                    break;
                case "k":
                    window.scrollBy({ top: -LINE_STEP, behavior });
                    break;
                case "g": {
                    const now = performance.now();
                    if (now - lastG < 600) {
                        window.scrollTo({ top: 0, behavior });
                        lastG = 0;
                    } else {
                        lastG = now;
                    }
                    break;
                }
                case "G":
                    window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            setActive(false);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [setActive]);

    return null;
}
