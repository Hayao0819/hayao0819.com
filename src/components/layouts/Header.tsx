"use client";

import { Link } from "@/components/elements/Link";

import { MainManus, OtherLinks } from "./CommonMenu";
import * as Drawer from "./Drawer";

export default function Header() {
    return (
        <nav className="my-0 flex items-center border-y-4 border-base-content bg-base-100 py-0 child:h-full">
            <Drawer.ToggleSwitch />
            <div className="h-full border-r-4 border-base-content">
                <Link className="h-full! btn btn-ghost text-lg" href="/" role="button">
                    Yamada Hayao
                </Link>
            </div>
            <div className="flex h-full grow items-center justify-start">
                <MainManus horizontal className="flex items-center p-0" />
            </div>

            <div className="hidden h-full sm:flex">
                <OtherLinks horizontal className="h-full p-0" />
            </div>
        </nav>
    );
}
