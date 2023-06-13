//import Image from "next/image";
import { useState } from "react";

export default function Header() {
    return (
        <>
            <SideBar>
                <StateText />
                <MenuItem />
            </SideBar>
        </>
    );
}

function StateText() {
    const [isOpened, changeState] = useState(false);

    const toggleMenu = () => {
        changeState(!isOpened);
    };

    if (isOpened) {
        return <p onClick={toggleMenu}>state = true</p>;
    } else {
        return <p onClick={toggleMenu}>state = false</p>;
    }
}

function SideBar({ children }) {
    return (
        <header className="text-center">
            <aside className="h-screen w-64 flex-col items-center bg-gray-900 px-4">
                <div className="text-white">{children}</div>
            </aside>
        </header>
    );
}

function MenuItem() {
    return <div className="select-none"></div>;
}
