"use client";

import { motion, MotionConfig, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

import useDrawerAtom from "@/hooks/useDrawerAtom";

export interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

/**
 * Drawer — Mono Signature variant.
 *
 * A "command palette" style slide-in: paper background, hairline
 * left border, mono chrome. Overlay is paper-tinted rather than
 * pure black so it stays in the two-tone palette.
 */
export default function Drawer(props: DrawerProps) {
    const [open, setOpen] = useDrawerAtom();
    const asideRef = useRef<HTMLElement>(null);

    const toggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        // controlled-from-outside reserved
    }, [props.open]);

    // Modal semantics: while open, the page behind is inert and scroll-locked,
    // focus moves into the dialog, Escape closes, and focus returns on close.
    useEffect(() => {
        if (!open) return;

        const page = document.querySelector<HTMLElement>("[data-page-root]");
        const skipLink = document.querySelector<HTMLElement>("[data-skip-link]");
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;

        page?.setAttribute("inert", "");
        skipLink?.setAttribute("inert", "");
        document.body.style.overflow = "hidden";

        // Visibility flips synchronously via the style prop below, but retry
        // across frames anyway: under frame starvation focus() can still run
        // before the browser considers the element focusable.
        let raf = 0;
        let tries = 0;
        const focusFirst = () => {
            const target = asideRef.current?.querySelector<HTMLElement>("button, a[href]");
            target?.focus();
            if (document.activeElement !== target && tries++ < 30) {
                raf = requestAnimationFrame(focusFirst);
            }
        };
        focusFirst();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("keydown", onKeyDown);
            page?.removeAttribute("inert");
            skipLink?.removeAttribute("inert");
            document.body.style.overflow = "";
            previous?.focus();
        };
    }, [open, setOpen]);

    const drawerVariants: Variants = {
        open: {
            opacity: 1,
            x: 0,
            visibility: "visible",
            transition: { type: "tween", duration: 0.22, ease: [0.2, 0.7, 0.2, 1] },
        },
        closed: {
            opacity: 0,
            x: "-100%",
            transition: { type: "tween", duration: 0.18, ease: "easeIn" },
            transitionEnd: { visibility: "hidden" },
        },
    };

    const overlayVariants: Variants = {
        open: { opacity: 1, transition: { duration: 0.18 } },
        closed: { opacity: 0, transition: { duration: 0.18 } },
    };

    return (
        <MotionConfig reducedMotion="user">
            <motion.div
                className="bg-foreground/30 fixed inset-0 z-40 h-svh w-screen"
                style={{ pointerEvents: open ? "auto" : "none" }}
                onClick={toggle}
                animate={open ? "open" : "closed"}
                variants={overlayVariants}
                initial={false}
                aria-hidden="true"
            />

            <motion.aside
                ref={asideRef}
                className="bg-background text-foreground border-foreground/15 invisible fixed top-0 left-0 z-50 h-svh w-[88%] max-w-[360px] border-r shadow-[8px_0_24px_-12px_rgba(0,0,0,0.18)]"
                // Synchronous so the aside is focusable the moment `open` renders;
                // the closed variant's transitionEnd still hides it after exit.
                style={{ visibility: open ? "visible" : undefined }}
                animate={open ? "open" : "closed"}
                variants={drawerVariants}
                initial={false}
                inert={!open}
                role="dialog"
                aria-modal="true"
                aria-label="navigation"
            >
                {props.children}
            </motion.aside>
        </MotionConfig>
    );
}
