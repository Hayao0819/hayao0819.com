"use client";

import Link from "next/link";
import { Navbar } from "react-daisyui";

import { MainManus, OtherLinks } from "./CommonMenu";
import * as Drawer from "./Drawer";

export default function Header({ onMouseEnter, onMouseLeave }: { onMouseEnter?: () => void; onMouseLeave?: () => void }) {
    return (
        <Navbar className="" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Drawer.Toggle />
            <div>
                <Link className="btn btn-ghost text-lg" href="/" role="button">
                    Yamada Hayao
                </Link>
            </div>
            <div className="hidden grow sm:flex">
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
