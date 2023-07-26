import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";
import { ReactNode } from "react";

//import TatebouHeader from "./Header";
import { ModalProvider } from "@/components/elements/NewModalContext";
import Meta from "@/const/tatebou";

import TatebouFooter from "./Footer";

export default function TatebouLayout({ children }: { children: ReactNode }) {
    //const mtx = useModal();
    //console.log(mtx.openModal)
    return (
        <ModalProvider>
            <Drawer>{children}</Drawer>
        </ModalProvider>
    );
}

function Drawer({ children }: { children: ReactNode }) {
    return (
        <div className="daisy-drawer">
            <input id="drawer-checkbox" type="checkbox" className="daisy-drawer-toggle" />
            <div className="daisy-drawer-content flex h-screen flex-col">
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
        <div className="daisy-drawer-side">
            <label htmlFor="drawer-checkbox" className="daisy-drawer-overlay"></label>
            <ul className="daisy-menu h-full w-80 bg-base-200 p-4">{children}</ul>
        </div>
    );
}

function NavBar({ children }: { children: ReactNode }) {
    return (
        <div className="daisy-navbar w-full bg-base-200">
            <div className="md:hidden">
                <label htmlFor="drawer-checkbox" className="daisy-btn-ghost daisy-btn-square daisy-btn">
                    <FontAwesomeIcon icon={faBars} size="xl" />
                </label>
            </div>
            <div className="mx-2 px-2 text-xl">{Meta.title}</div>
            <div className="hidden md:flex">
                <ul className="daisy-menu daisy-menu-horizontal">{children}</ul>
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
