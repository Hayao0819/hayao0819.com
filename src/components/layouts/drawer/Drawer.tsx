"use client";

import cn from "classnames";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { drawerAtom } from "@/lib/atom";

export interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
}

export default function Drawer(props: DrawerProps) {
    const [open, setOpen] = useAtom(drawerAtom);

    useEffect(() => {
        if (props.open === undefined) {
            props.open = false;
        }
        setOpen(props.open);
    }, [props.open]);

    const toggle = () => setOpen(!open);

    return (
        <motion.div
            className={cn("fixed h-screen w-screen bg-black/70 z-10 flex", {
                //hidden: !open,
            })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="h-full w-1/2 bg-neutral text-neutral-content"></div>
            <div className="h-full w-1/2" onClick={toggle} />
        </motion.div>
    );
}
