import { ReactNode } from "react";
//import sideBarContext from "@/context/SideBar";

interface SidebarProps {
    children: ReactNode;
    isOpened: boolean;
}

export function SideBar(props: SidebarProps) {
    return (
        <aside id="sidebar" className={"fixed z-50 hidden h-full w-1/2 flex-col bg-gray-900 px-4 text-white marker:w-64 sm:static sm:float-left sm:block sm:min-h-screen sm:w-64"}>
            <div>{props.children}</div>
        </aside>
    );
}

export { Button } from "./Button";
