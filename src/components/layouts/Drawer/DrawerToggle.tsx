"use client";

import { FaBars } from "react-icons/fa6";

import useDrawerAtom from "@/hooks/useDrawerAtom";

export default function DrawerToggle() {
    const [open, setOpen] = useDrawerAtom();

    const toggle = () => {
        console.log("toggle");
        setOpen(!open);
    };

    return (
        <span className="btn btn-square btn-ghost text-accent " onClick={toggle}>
            <FaBars />
        </span>
    );
}
