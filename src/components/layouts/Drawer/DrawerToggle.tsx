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
            className="border-border hover:bg-foreground/5 flex items-center justify-center border-r-4 px-4 py-3 text-2xl transition-colors"
            onClick={toggle}
        >
            <FaBars />
        </button>
    );
}
