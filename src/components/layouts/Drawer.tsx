import { My } from "../elements/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarContents, SidebarBottomContents } from "./SideBarContents";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Metadata from "@/const/meta";
import BaseColor from "./BaseColor";

export default function DrawerSide() {
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

