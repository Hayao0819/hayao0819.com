import NextLink from "next/link";
import { ReactNode } from "react";
import { FaBars } from "react-icons/fa";

import Meta from "@/const/tatebou";

import TatebouFooter from "./Footer";
import Head from "./Head";

export default function TatebouLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head title="迫真縦棒短縮URL" description="縦な短縮URLを作成するサービスです" />

            <Drawer>{children}</Drawer>
        </>
    );
}

function Drawer({ children }: { children: ReactNode }) {
    return (
        <div className="drawer">
            <input id="drawer-checkbox" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex h-screen flex-col">
                <NavBar>
                    <MenuContents />
                </NavBar>

                <main className="mx-auto w-4/5 grow py-12 child:leading-10 md:w-3/5">{children}</main>
                <TatebouFooter />
            </div>
            <DrawerSide>
                <MenuContents />
            </DrawerSide>
        </div>
    );
}

function DrawerSide({ children }: { children: ReactNode }) {
    return (
        <div className="drawer-side md:hidden">
            <label htmlFor="drawer-checkbox" className="drawer-overlay"></label>
            <ul className="menu h-full w-80 bg-base-200 p-4">{children}</ul>
        </div>
    );
}

function NavBar({ children }: { children: ReactNode }) {
    return (
        <div className="navbar w-full bg-base-200">
            <div className="md:hidden">
                <label htmlFor="drawer-checkbox" className="btn btn-square btn-ghost">
                    <FaBars />
                </label>
            </div>
            <div className="mx-2 px-2 text-xl">
                <NextLink href="/tatebou">{Meta.title}</NextLink>
            </div>
            <div className="hidden md:flex">
                <ul className="menu menu-horizontal">{children}</ul>
            </div>
        </div>
    );
}

function MenuContents() {
    return (
        <>
            <MenuItem name="作者" link="/" />
            <MenuItem name="本家様" link="https://1lil.li/" />
            <MenuItem name="ドメイン所有者" link="https://yamad.me/" />
            <MenuItem name="ソースコード" link="https://github.com/Hayao0819/hayao0819.com/tree/dev/src/pages/tatebou" />
            <MenuItem name="バグ報告" link="https://github.com/Hayao0819/hayao0819.com/issues" />
            <MenuItem name="About" link="/tatebou/about" />
        </>
    );
}
function MenuItem({ name, link }: { name: string; link: string }) {
    return (
        <li className="child:text-gray-500">
            <NextLink href={link}>{name}</NextLink>
        </li>
    );
}
