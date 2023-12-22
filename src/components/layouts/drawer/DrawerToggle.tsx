"use client";

import { useAtom } from "jotai";
import { FaBars } from "react-icons/fa6";

import { drawerAtom } from "@/lib/atom";

export default function DrawerToggle() {
    const [open, setOpen] = useAtom(drawerAtom);

    const toggle = () => {
        console.log("toggle");
        setOpen(!open);
    };

    return (
        <span className="btn btn-square btn-ghost" onClick={toggle}>
            <FaBars />
        </span>
    );
}
