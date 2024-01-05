"use client";

import Link from "next/link";
import { Navbar } from "react-daisyui";

import { MainManus, OtherLinks } from "./CommonMenu";
import * as Drawer from "./Drawer";

export default function Header({ onMouseEnter, onMouseLeave }: { onMouseEnter?: () => void; onMouseLeave?: () => void }) {
    return (
        <Navbar className="my-2 bg-base-200 shadow-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Drawer.ToggleSwitch />
            <div>
                <Link className="btn btn-ghost text-lg text-accent" href="/" role="button">
                    Yamada Hayao
                </Link>
            </div>
            <div className="hidden grow md:flex">
                <Navbar.Start>
                    <MainManus horizontal />
                </Navbar.Start>
            </div>

            <Navbar.End className="hidden sm:flex">
                <OtherLinks horizontal />
            </Navbar.End>
        </Navbar>
    );
}
