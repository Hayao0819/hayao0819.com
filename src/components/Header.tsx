import Image from "next/image";
import { ReactNode, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Metadata from "../const/meta";
import { sideBarContext } from "@/hooks/SideBar";
//import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <HeaderForPC>
                <MyIcon />
                <MenuItem link="/" label="Top" />
                <MenuItem link="https://google.com" label="Google" />
                <MenuItem link="/social" label="ソーシャル" />
            </HeaderForPC>
            <HeaderForSP />
        </header>
    );
}

function MyIcon() {
    return (
        <div className="text-center">
            <Image
                src="/icons/top.jpeg"
                alt="ハヤオのアイコン"
                width={150}
                height={150}
                className="m-4 inline"
            ></Image>
        </div>
    );
}

function HeaderForSP() {
    return (
        <div className="flex w-screen items-center justify-center bg-gray-900 text-white sm:hidden">
            <SideBarBtn />
            <h1 className=" mx-auto">{Metadata.title}</h1>
        </div>
    );
}

function SideBarBtn() {
    const { isOpened, setOpened } = useContext(sideBarContext);
    const toggleMenu = () => {
        setOpened(!isOpened);
    };

    return (
        <button type="button" className="m-4 rounded-lg p-2 text-sm" onClick={toggleMenu}>
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
    );
}

// You can create a representation of props in the form of an interface.
// This type of approach is called "type-driven development" and this is a very good practice.
interface Props {
    children: ReactNode;
}
//
// function HeaderForPC({ children }: Props) {
//     return <SideBar>{children}</SideBar>;
// }

// Also, you can use this type of direct approach.
// function HeaderForPC({ children }: { children: ReactNode }) {
//     return <SideBar>{children}</SideBar>;
// }

// Remember!
// Any component receives only one parameter by default which is "props".
// Without object annotation, it would have looked like that:
function HeaderForPC(props: Props) {
    return <SideBar>{props.children}</SideBar>;
}

// We just store our own parameters inside props and pass it to parent or child components :D

function SideBar({ children }: Props) {
    const [isOpened, setOpened] = useState(true);

    return (
        // sideBarContextの内容でいい感じに表示内容を分岐させたいけど方法がわからん
        // そもそもProviderとかいう謎のコンポーネントをなんで使わなきゃいけないのだ
        //グローバル変数でuseStateをそのまま使えればいいだけの話だと思う
        <sideBarContext.Provider value={{ isOpened, setOpened }}>
            <aside
                id="sidebar"
                className="sm:h-screen w-64 flex-col bg-gray-900 text-white px-4 hidden sm:block"
            >
                <div>{children}</div>
            </aside>
        </sideBarContext.Provider>
    );
}

interface Item {
    link: string;
    label: string;
}

function MenuItem({ link, label }: Item) {
    return (
        <div className="select-none">
            <Link
                href={link}
                className="m-4 flex items-center rounded-lg px-4  py-2 text-sm hover:bg-gray-700"
            >
                {label}
            </Link>
        </div>
    );
}
