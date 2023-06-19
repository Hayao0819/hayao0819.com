import { SideBar } from "../Sidebar";
import Metadata from "@/const/meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { default as NewSideBar } from "@/components/NewSidebar";

export default function Header() {
    const [isOpened, setOpenedStatus] = useState(false);
    const toggleMenu = () => {
        setOpenedStatus(!isOpened);
    };

    return (
        <header>
            {/* isOpened==trueなら閉じる用のオーバーレイを表示 */}
            {isOpened ? <div className="fixed top-0 z-20 h-screen w-screen sm:hidden" onClick={toggleMenu}></div> : <></>}
            <div className="fixed top-0 z-50 flex h-16 w-screen items-center justify-center bg-gray-900 text-white sm:hidden">
                <button type="button" className="m-4 rounded-lg p-2 text-sm" onClick={toggleMenu}>
                    <span className="sr-only">Open sidebar</span>
                    <FontAwesomeIcon icon={faBars} size="xl" />
                </button>
                <h1 className="mx-auto">{Metadata.title}</h1>
            </div>
            <SideBar isOpened={isOpened} />
        </header>
    );
}
