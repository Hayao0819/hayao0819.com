import { ReactNode } from "react";
//import sideBarContext from "@/context/SideBar";

interface SidebarProps {
    children: ReactNode;
    isOpened: boolean;
}

export function SideBar(props: SidebarProps) {
    return (
        <aside id="sidebar" className={"hidden z-50 flex-col bg-gray-900 px-4 sm:static w-1/2 h-full fixed text-white marker:w-64 sm:float-left sm:block sm:min-h-screen sm:w-64"}>
            <div>{props.children}</div>
        </aside>
        
    );
}


export { Button } from "./Button";
