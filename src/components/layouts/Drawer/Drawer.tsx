"use client";

import classNames from "clsx";
import { motion, MotionConfig, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

import useDrawerAtom from "@/hooks/useDrawerAtom";

export interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export default function Drawer(props: DrawerProps) {
    const [open, setOpen] = useDrawerAtom();
    const panelRef = useRef<HTMLDivElement>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    // Toggle open state
    const toggle = () => {
        setOpen(!open);
    };

    // Close with Escape while open
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, setOpen]);

    // Modal semantics: inert the page shell, move focus into the dialog, restore it on close
    useEffect(() => {
        const shell = document.getElementById("page-shell");
        let raf = 0;
        if (open) {
            lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            shell?.setAttribute("inert", "");
            // framer-motion flips visibility on its own rAF tick, and focus() on a
            // visibility:hidden element silently fails — wait two frames before focusing
            raf = requestAnimationFrame(() => {
                raf = requestAnimationFrame(() => panelRef.current?.focus());
            });
        } else {
            shell?.removeAttribute("inert");
            lastFocusedRef.current?.focus();
            lastFocusedRef.current = null;
        }
        return () => {
            cancelAnimationFrame(raf);
            shell?.removeAttribute("inert");
        };
    }, [open]);

    const leftdrawer_variants: Variants = {
        open: {
            opacity: 1,
            x: 0,
            visibility: "visible",
            transition: {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
            },
        },
        closed: {
            opacity: 0,
            x: "-100%",
            transition: {
                type: "tween",
                duration: 0.2,
                ease: "easeIn",
            },
            transitionEnd: { visibility: "hidden" },
        },
    };

    const rightoverlay_variants: Variants = {
        open: {
            opacity: 1,
            x: 0,
            visibility: "visible",
            transition: {
                type: "tween",
                duration: 0.2,
            },
        },
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "tween",
                duration: 0.2,
            },
            transitionEnd: { visibility: "hidden" },
        },
    };

    return (
        <MotionConfig reducedMotion="user">
            <motion.div
                className="fixed z-10 h-svh w-screen bg-black/70"
                onClick={toggle}
                animate={open ? "open" : "closed"}
                variants={rightoverlay_variants}
                initial={false}
                aria-hidden="true"
            />

            <motion.div
                ref={panelRef}
                id="site-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                tabIndex={-1}
                inert={!open}
                aria-hidden={!open}
                className={classNames(
                    "bg-background text-foreground border-foreground/15 fixed z-20 h-svh w-[88%] border-r outline-none sm:w-[440px]",
                    { invisible: !open },
                )}
                animate={open ? "open" : "closed"}
                variants={leftdrawer_variants}
                initial={false}
            >
                {props.children}
            </motion.div>
        </MotionConfig>
    );
}
