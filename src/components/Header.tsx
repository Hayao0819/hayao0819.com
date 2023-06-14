import Image from "next/image";
import { ReactNode, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Metadata from "../const/meta";
import { sideBarContext } from "@/hooks/SideBar";
import { useRouter } from "next/router";
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
                className="inline m-4"
            ></Image>
        </div>
    );
}

function HeaderForSP() {
    return (
        <div className="sm:hidden w-screen flex items-center justify-center bg-gray-900 text-white">
            <SideBarBtn />
            <h1 className=" ml-auto mr-auto">{Metadata.title}</h1>
        </div>
    );
}

function SideBarBtn() {
    const { isOpened, setOpened } = useContext(sideBarContext);
    const toggleMenu = () => {
        setOpened(!isOpened);
    };

    return (
        <button type="button" className="p-2 m-4 text-sm rounded-lg" onClick={toggleMenu}>
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
    );
}

interface Props {
    children: ReactNode;
}

function HeaderForPC({ children }: Props) {
    return <SideBar>{children}</SideBar>;
}
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
                className="m-4 px-4 py-2 hover:bg-gray-700 rounded-lg  flex items-center text-sm"
            >
                {label}
            </Link>
        </div>
    );
}
