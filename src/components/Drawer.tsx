import Header from "./Header";
import Footer from "@/components/Footer";
import { My } from "./Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarContents, SidebarBottomContents } from "./SideBarContents";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Metadata from "@/const/meta";
import { ReactNode } from "react";

export function DrawerSide() {
    return (
        <aside className="daisy-drawer-side">
            <label htmlFor="sidebar" className="daisy-drawer-overlay"></label>
            <div className="hidden-scrollbar flex min-h-full overflow-scroll">
                <ul className="daisy-menu min-h-full w-64 bg-slate-50 p-4 dark:bg-neutral-600">
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
                <div className="grow"></div>
            </div>
        </aside>
    );
}

export function DrawerContents({ children }: { children: ReactNode }) {
    return (
        <div className="daisy-drawer-content flex min-h-screen flex-col items-center justify-center">
            <Header />
            <main className="w-full grow p-4 leading-8">{children}</main>
            <Footer />
        </div>
    );
}
