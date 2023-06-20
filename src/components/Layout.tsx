import React from "react";
import Footer from "@/components/Footer";
//import { ReactNode } from "react";
import { My } from "./Icons";
import { Item as MenuItem } from "./Menu";
import { faContactCard, faHouse, faKitchenSet, faMessage } from "@fortawesome/free-solid-svg-icons";

interface Props {
    children: React.ReactNode;
}

export function Layout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="drawer sm:drawer-open">
                <input id="sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex-col items-center justify-center sm:flex">
                    <HeaderForSP />
                    <main className="grow p-4 leading-8">{children}</main>
                    <Footer></Footer>
                </div>
                <div className="drawer-side">
                    <label htmlFor="sidebar" className="drawer-overlay"></label>
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
                </div>
            </div>
        </div>
    );
}

export default Layout;

function HeaderForSP() {
    return (
        <div className="navbar static w-full bg-base-300 sm:hidden">
            <div className="flex-none">
                <label htmlFor="sidebar" className="btn-ghost btn-square btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
            </div>
            <div className="mx-2 flex-1 px-2">Navbar Title</div>
        </div>
    );
}
