import React, { ReactNode, useState } from "react";

import BaseColor from "./BaseColor";
import DrawerSide from "./Drawer";
//import { DrawerContents, DrawerSide } from "./Drawer";
import DrawerContents from "./MainContents";
//import Head from "next/head";
//import BaseColor from "./BaseColor";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    // よくわからないけどここでstateを使うといい感じにリンクがクリックされたときにメニューが閉じる
    const [isDrawerOpened, changeDrawerOpened] = useState(false);
    return (
        <BaseColor>
            <div className="flex min-h-screen flex-col">
                <div className="daisy-drawer md:daisy-drawer-open">
                    <input id="sidebar" type="checkbox" className="daisy-drawer-toggle" checked={isDrawerOpened} onClick={()=>changeDrawerOpened(!isDrawerOpened)} readOnly />
                    <DrawerContents>{children}</DrawerContents>
                    <DrawerSide />
                </div>
            </div>
        </BaseColor>
    );
}

export default Layout;
