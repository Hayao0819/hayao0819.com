import React, { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "@/components/Footer";
import { My } from "./Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarContents, SidebarBottomContents } from "./SideBarContents";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Metadata from "@/const/meta";
//import Head from "next/head";
import BaseColor from "./BaseColor";

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

function DrawerSide() {
    return (
        <aside className="daisy-drawer-side">
            <label htmlFor="sidebar" className="daisy-drawer-overlay"></label>
            <div className="hidden-scrollbar flex min-h-full overflow-scroll">
                <BaseColor>
                    <ul className="daisy-menu min-h-full w-64  p-4">
                        {/* スマホ用の閉じるボタン */}
                        <label htmlFor="sidebar" className="daisy-btn-ghost daisy-btn-square daisy-btn sm:hidden">
                            <FontAwesomeIcon icon={faXmark} size="xl" />
                        </label>

                        <div className="text-center">
                            <My />
                            <h1 className="block">{Metadata.title}</h1>
                        </div>
                        <SidebarContents />
                        <div className="grow" />
                        <SidebarBottomContents />
                    </ul>
                </BaseColor>
                <div className="grow"></div>
            </div>
        </aside>
    );
}

function DrawerContents({ children }: { children: ReactNode }) {
    return (
        <div className="daisy-drawer-content flex min-h-screen flex-col items-center justify-center">
            <Header />
            <main className="w-full grow p-4 leading-8">{children}</main>
            <Footer />
        </div>
    );
}
