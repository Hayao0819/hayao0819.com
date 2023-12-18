"use client";
"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu } from "react-daisyui";
import { useOnClickOutside } from "usehooks-ts";

export function MainManus({ horizontal }: { horizontal?: boolean }) {
    return (
        <Menu horizontal={horizontal}>
            <MenuItem href="/" text="Home" />
            <MenuItemBlog />
            <MenuItem href="/portfolio" text="Portfolio" />
            <MenuItem href="/links" text="Links" />
        </Menu>
    );
}

export function OtherLinks({ horizontal }: { horizontal?: boolean }) {
    return (
        <Menu horizontal={horizontal}>
            <Menu.Item>
                <Link href="/tatebou">Tatebou</Link>
            </Menu.Item>
            <Menu.Item>
                <Link className="!bg-primary-content !text-primary" href="https://seppuku.club/">
                    Seppuku
                </Link>
            </Menu.Item>
        </Menu>
    );
}

function MenuItemBlog() {
    const [isOpened, setIsOpened] = useState(false);
    const detailsRef = useRef(null);

    useOnClickOutside(detailsRef, () => {
        setIsOpened(false);
    });

    return (
        <Menu.Item>
            <details
                className="dropdown"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpened(!isOpened);
                }}
                open={isOpened}
                ref={detailsRef}
            >
                <summary>Blog</summary>
                <Menu className="text-base-content">
                    <MenuItem href="/blog/1" text="Blog" />
                    <MenuItem href="/blog/about" text="About" />
                </Menu>
            </details>
        </Menu.Item>
    );
}

function MenuItem({ href, text, onClick }: { href: string; text: string; onClick?: () => void }) {
    return (
        <Menu.Item onClick={onClick}>
            <Link href={href} className="!text-inherit">
                {text}
            </Link>
        </Menu.Item>
    );
}
