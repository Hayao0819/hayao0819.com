"use client";

import { FaBars } from "react-icons/fa6";

import useDrawerAtom from "@/hooks/useDrawerAtom";

export default function DrawerToggle() {
    const [open, setOpen] = useDrawerAtom();

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <button
            className="hover:text-foreground text-foreground/70 -my-2 -ml-3 flex h-11 w-11 items-center justify-center text-lg transition-colors"
            onClick={toggle}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="site-drawer"
        >
            <FaBars />
        </button>
    );
}
