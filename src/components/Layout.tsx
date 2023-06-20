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
        <div className="flex min-h-screen flex-col">
            <div className="drawer sm:drawer-open">
                <input id="sidebar" type="checkbox" className="drawer-toggle" />
                <DrawerContents>{children}</DrawerContents>
                <DrawerSide />
            </div>
        </div>
    );
}

export default Layout;

function DrawerSide() {
    return (
        <aside className="drawer-side">
            <label htmlFor="sidebar" className="drawer-overlay"></label>
            <div className="flex h-full">
                <ul className="menu h-full w-64 bg-gray-900 p-4 text-white">
                    <label htmlFor="sidebar" className="btn-ghost btn-square btn sm:hidden">
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
        <div className="drawer-content flex-col items-center justify-center sm:flex">
            <Header />
            <main className="w-full grow p-4 leading-8">{children}</main>
            <Footer />
        </div>
    );
}
