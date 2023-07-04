import React, { ReactNode, useState } from "react";
import { DrawerContents, DrawerSide } from "./Drawer";
//import Head from "next/head";
//import BaseColor from "./BaseColor";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    // よくわからないけどここでstateを使うといい感じにリンクがクリックされたときにメニューが閉じる
    const [isDrawerOpened] = useState(false);
    const SwitchSidebarCheckbox = () => {
        if (isDrawerOpened) {
            return <input id="sidebar" type="checkbox" className="daisy-drawer-toggle" checked />;
        } else {
            return <input id="sidebar" type="checkbox" className="daisy-drawer-toggle" />;
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <div className="daisy-drawer sm:daisy-drawer-open">
                <SwitchSidebarCheckbox />
                <DrawerContents>{children}</DrawerContents>
                <DrawerSide />
            </div>
        </div>
    );
}

export default Layout;
