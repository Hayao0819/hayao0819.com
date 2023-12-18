"use client";

import Link from "next/link";
import { Navbar } from "react-daisyui";
import { FaBars } from "react-icons/fa";

import { MainManus, OtherLinks } from "./CommonMenu";

export default function Header({
    drawerId,
    onMouseEnter,
    onMouseLeave,
}: {
    drawerId: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}) {
    return (
        <Navbar
            className=" bg-neutral text-neutral-content active:text-neutral-content"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <label htmlFor={drawerId} aria-label="open sidebar" className="btn btn-square btn-ghost">
                <FaBars />
            </label>
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
