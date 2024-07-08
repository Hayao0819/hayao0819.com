"use client";

import { Navbar } from "react-daisyui";

import { Link } from "@/components/elements/Link";

import { MainManus, OtherLinks } from "./CommonMenu";
import * as Drawer from "./Drawer";

export default function Header({ onMouseEnter, onMouseLeave }: { onMouseEnter?: () => void; onMouseLeave?: () => void }) {
    return (
        <Navbar className="bg-base-100" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
