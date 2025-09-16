"use client";

import classNames from "clsx";
import { motion, Variants } from "framer-motion";
import { useEffect } from "react";

import useDrawerAtom from "@/hooks/useDrawerAtom";

export interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export default function Drawer(props: DrawerProps) {
    const [open, setOpen] = useDrawerAtom();

    // Toggle open state
    const toggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        // if (props.open === undefined) {
        //     props.open = false;
        // }
        // setOpen(props.open);
    }, [props.open]);

    const leftdrawer_variants: Variants = {
        open: {
            opacity: 1,
            x: 0,
            transition: {
                y: {
                    stiffness: 1000,
                },
            },
        },
        closed: {
            opacity: 0,
            x: "-100%",
            transition: {
                y: {
                    stiffness: 1000,
                },
            },
        },
    };

    const rightoverlay_variants: Variants = {
        ...leftdrawer_variants,
        ...{
            closed: {
                x: "100%",
            },
        },
    };

    return (
        <>
            <motion.div
                className="fixed z-10 h-svh w-screen bg-black/70"
                onClick={toggle}
                animate={open ? "open" : "closed"}
                variants={rightoverlay_variants}
                initial={false}
            />

            <motion.div
                className={classNames("fixed z-20 h-svh w-4/5 bg-base-100 text-base-content md:w-1/3", {
                    //hidden: isFirstRender,
                })}
                animate={open ? "open" : "closed"}
                variants={leftdrawer_variants}
                initial={false}
            >
                {props.children}
            </motion.div>
        </>
    );
}
