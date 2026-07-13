"use client";

import useDrawerAtom from "@/hooks/useDrawerAtom";

export default function DrawerToggle() {
    const [open, setOpen] = useDrawerAtom();

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <button
            className="font-mono-chrome text-foreground/70 hover:text-foreground -mx-2 inline-flex min-h-11 items-center gap-1 px-2 text-[11px] tracking-[0.14em]"
            onClick={toggle}
            aria-label="menu"
            aria-expanded={open}
        >
            <span className="text-foreground/35">[</span>
            <span>{open ? "close" : "menu"}</span>
            <span className="text-foreground/35">]</span>
        </button>
    );
}
