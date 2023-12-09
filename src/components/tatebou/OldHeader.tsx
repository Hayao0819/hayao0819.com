import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useRef, useState } from "react";

export default function TatebouHeader() {
    const [menuIsOpened, changeMenuOpened] = useState(false);
    const toggleMenu = () => [changeMenuOpened(!menuIsOpened)];
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuHeightClass, changeHeightMenuClass] = useState("");

    useEffect(() => {
        if (menuIsOpened) {
            changeHeightMenuClass("!h-16 lg:transition-none ");
        } else {
            changeHeightMenuClass("h-0");
        }
    }, [menuIsOpened]);

    useEffect(() => {
        if (menuRef.current) {
            menuRef.current.addEventListener("resize", () => {
                if (menuRef.current) {
                    menuRef.current.classList.add("transition-none");
                }
            });
        }
    });

    return (
        <header>
            <div className="bg-neutral-50 px-4 child:p-2 lg:flex">
                <div className="flex lg:block">
                    <div className="child:min-w-fit child:whitespace-nowrap">
                        <h1 className="p-2 text-lg">迫真縦棒短縮URL</h1>
                    </div>
                    <div className="grow lg:hidden"></div>
                    <div className="lg:hidden lg:grow-0">
                        <label htmlFor="tatebou-menu-btn" className="">
                            <FontAwesomeIcon icon={faBars} size="xl" className="ml-auto p-2" />
                        </label>
                        <input type="checkbox" onClick={toggleMenu} id="tatebou-menu-btn" className="hidden" />
                    </div>
                </div>
                <div
                    ref={menuRef}
                    onClick={toggleMenu}
                    className={menuHeightClass + " h-0 overflow-hidden transition-all delay-150 duration-300 lg:block lg:!h-16"}
                >
                    <MenuBar>
                        <MenuContents />
                    </MenuBar>
                </div>
            </div>
        </header>
    );
}

function MenuBar({ children }: { children: ReactNode }): ReactNode {
    return <ul className="menu menu-horizontal child:px-2 child:text-lg child:text-neutral-500 lg:flex-row">{children}</ul>;
}

function MenuItem({ children }: { children: ReactNode }): ReactNode {
    return <li>{children}</li>;
}

function MenuContents(): ReactNode {
    return (
        <>
            <MenuItem>このサイトの作者</MenuItem>
            <MenuItem>本家縦棒ドメイン</MenuItem>
            <MenuItem>ドメイン所有者</MenuItem>
            <MenuItem>ソースコード</MenuItem>
        </>
    );
}
