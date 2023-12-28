"use client";

import classNames from "classnames";
import { motion, Variants } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { drawerAtom } from "@/lib/atom";

export interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export default function Drawer(props: DrawerProps) {
    const [open, setOpen] = useAtom(drawerAtom);
    //const [isFirstRender, setIsFirstRender] = useState(true);

    // Update open state when props.open changes

    useEffect(() => {
        if (props.open === undefined) {
            props.open = false;
        }
        setOpen(props.open);
    }, [props.open]);

    // Toggle open state
    const toggle = () => {
        console.log("toggle");
        setOpen(!open);
    };

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
                className={classNames("fixed z-10 w-screen h-svh bg-black/70", {
                    //hidden: isFirstRender,
                })}
                onClick={toggle}
                animate={open ? "open" : "closed"}
                variants={rightoverlay_variants}
                initial={false}
            />

            <motion.div
                className={classNames("fixed z-20 h-svh w-4/5 md:w-1/3 bg-base-100 text-base-content", {
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
