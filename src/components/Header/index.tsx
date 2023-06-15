import { SideBar } from "../Sidebar";
import Metadata from "@/const/meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { default as NewSideBar } from "@/components/NewSidebar";

export default function Header() {
    const [isOpened, setOpenedStatus] = useState(true)
    const toggleMenu = ()=>{
        setOpenedStatus(!isOpened)
    }

    return (
        <header>
            <div className="sticky top-0 z-50 flex w-screen items-center justify-center bg-gray-900 text-white sm:hidden">
                <button type="button" className="m-4 rounded-lg p-2 text-sm" onClick={toggleMenu}>
                    <span className="sr-only">Open sidebar</span>
                    <FontAwesomeIcon icon={faBars} size="xl" />
                </button>
                <h1 className="mx-auto">{Metadata.title}</h1>
            </div>
            <SideBar isOpened={isOpened}/>
        </header>
    );
}
