import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Metadata from "@/const/meta";

import { My } from "../elements/Icons";
//import BaseColor from "./BaseColor";
import { SidebarBottomContents, SidebarContents } from "./SideBarContents";

export default function DrawerSide() {
    return (
        <aside className="daisy-drawer-side">
            <label htmlFor="sidebar" className="daisy-drawer-overlay"></label>
            <div className="hidden-scrollbar flex min-h-full overflow-scroll">
                <ul className="daisy-menu min-h-full w-64 p-0 shadow-inner">
                    {/* スマホ用の閉じるボタン */}
                    <label htmlFor="sidebar" className="daisy-btn-ghost daisy-btn-square daisy-btn md:hidden">
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
