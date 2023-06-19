import { My } from "../Icons";
import { Item as MenuItem } from "../Menu";

import { faContactCard, faHouse, faKitchenSet, faMessage } from "@fortawesome/free-solid-svg-icons";

//import sideBarContext from "@/context/SideBar";

interface SidebarProps {
    isOpened: boolean;
}

export function SideBar({ isOpened }: SidebarProps) {
    console.log(isOpened);
    if (isOpened) {
        // isOpened==trueなら常にそのまま表示
        return SideBarCommon();
    } else {
        // isOpened==falseなら、PCなら表示 スマホなら隠す
        return <div className="hidden sm:block">{SideBarCommon()}</div>;
    }
}

function SideBarCommon() {
    return (
        <>
            <aside id="sidebar" className={"fixed z-50 h-full w-1/2 flex-col bg-gray-900 px-4 text-white marker:w-64 sm:static sm:float-left sm:mt-0 sm:block sm:min-h-screen sm:w-64"}>
                <div className="flex min-h-screen flex-col">
                    <div className="grow">{SideBarContents()}</div>
                    <div>{BottomSideBarContents()}</div>
                </div>
            </aside>
        </>
    );
}

function SideBarContents() {
    return (
        <>
            <My />
            <MenuItem link="/" icon={faHouse}>
                Home
            </MenuItem>
            <MenuItem link="/skill" icon={faKitchenSet}>
                Skill
            </MenuItem>
            <MenuItem link="/social" icon={faMessage}>
                Social
            </MenuItem>
            <MenuItem link="/contact" icon={faContactCard}>
                Contact
            </MenuItem>
        </>
    );
}

function BottomSideBarContents() {
    return (
        <>
            <MenuItem link="https://old.hayao0819.com">Old Page</MenuItem>
        </>
    );
}
