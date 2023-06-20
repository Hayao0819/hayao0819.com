import { My } from "../Icons";
import { NewItem as MenuItem } from "../Menu/Item";
import { faContactCard, faHouse, faKitchenSet, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
    return (
        <div className="drawer lg:drawer-open">
            <input id="sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content hidden flex-col items-center justify-center sm:flex">
                <div className="navbar w-full bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="sidebar" className="btn-ghost btn-square btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Navbar Title</div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="sidebar" className="drawer-overlay"></label>
                {/*
                <ul className="menu h-full w-80 bg-base-200 p-4 text-base-content">
                    <li>
                        <a>Sidebar Item 1</a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
    */}
                {SideBarContents()}
            </div>
        </div>
    );
}

function SideBarContents() {
    return (
        <>
            <ul className="menu h-full w-80 bg-base-200 p-4 text-base-content">
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
            </ul>
        </>
    );
}
