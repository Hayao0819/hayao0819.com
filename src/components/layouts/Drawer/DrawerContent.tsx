"use client";

import { Heading } from "@/components/elements/Heading";

import { MainManus } from "../CommonMenu";
import { useDrawer } from ".";

export default function DrawerContent() {
    const [, toggleDrawer] = useDrawer();

    return (
        <div className="m-2">
            <div>
                <Heading level={2} className="text-center">
                    Yamada Hayao
                </Heading>
            </div>
            <MainManus onMenuItemClick={toggleDrawer} />
        </div>
    );
}
