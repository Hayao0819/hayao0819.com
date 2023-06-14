import Image from "next/image";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Header() {
    return (
        <>
            <SideBar>
                <MyIcon />
                <MenuItem link={new URL("https://google.com")} label="Google" />
            </SideBar>
        </>
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

function SideBar({ children }: Props) {
    return (
        <header className="">
            <aside className="h-screen w-64 flex-col bg-gray-900 px-4">
                <div className="text-white">{children}</div>
            </aside>
        </header>
    );
}

interface Item {
    link: URL;
    label: string;
}

function MenuItem({ link, label }: Item) {
    return (
        <div className="select-none">
            <a
                href={link.toString()}
                className="m-4 px-4 py-2 hover:bg-gray-700 rounded-lg  flex items-center text-sm"
            >
                {label}
            </a>
        </div>
    );
}
