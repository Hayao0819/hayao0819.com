import React from "react";
import Header from "./Header";
import Footer from "@/components/Footer";
import { My } from "./Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarContents, SidebarBottomContents } from "./SideBarContents";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
    children: React.ReactNode;
}

export function Layout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-base-100">
            <div className="daisy-drawer sm:daisy-drawer-open">
                <input id="sidebar" type="checkbox" className="daisy-drawer-toggle" />
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
            <div className="flex h-full !bg-gray-900 text-white">
                <ul className="daisy-menu h-full w-64 p-4">
                    <label htmlFor="sidebar" className="daisy-btn-ghost daisy-btn-square daisy-btn sm:hidden">
                        <FontAwesomeIcon icon={faXmark} size="xl" />
                    </label>
                    <My />
                    <SidebarContents />
                    <div className="grow" />
                    <SidebarBottomContents />
                </ul>
                <div className="grow"></div>
            </div>
        </aside>
    );
}

function DrawerContents({ children }: Props) {
    return (
        <div className="daisy-drawer-content flex min-h-screen flex-col items-center justify-center">
            <Header />
            <main className="w-full grow p-4 leading-8">{children}</main>
            <Footer />
        </div>
    );
}
