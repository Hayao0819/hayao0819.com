import { My } from "../Icons";
import { Item as MenuItem } from "../Menu";
//import sideBarContext from "@/context/SideBar";

interface SidebarProps {
    isOpened: boolean;
}

export function SideBar({isOpened}: SidebarProps) {
    console.log(isOpened)
    if (isOpened){
        return <div className="">{SideBarCommon()}</div>;
    }else{
        return <div className="hidden sm:block">{SideBarCommon()}</div>;
    }
}


function SideBarCommon(){
    return (
        <aside id="sidebar" className={"fixed z-50 h-full w-1/2 flex-col bg-gray-900 px-4 text-white marker:w-64 sm:static sm:float-left sm:block sm:min-h-screen sm:w-64"}>
            <div>{SideBarContents()}</div>
        </aside>
    );
}


function SideBarContents(){
    return (
        <>
            <My />
            <MenuItem link="/">Top</MenuItem>
            <MenuItem link="">Skill</MenuItem>
            <MenuItem link="/social">Social</MenuItem>
            <MenuItem link="">Contact</MenuItem>
            <MenuItem link="https://old.hayao0819.com">Old Page</MenuItem>
        </>
    );
}
