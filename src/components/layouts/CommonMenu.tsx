"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu } from "react-daisyui";
import { useOnClickOutside } from "usehooks-ts";

export interface MenusCommonProps {
    onMenuItemClick?: () => void;
}

export interface MenusProps extends MenusCommonProps {
    className?: string;
    horizontal?: boolean;
}

export function MainManus({ horizontal, className, onMenuItemClick }: MenusProps) {
    return (
        <Menu horizontal={horizontal} className={className}>
            <MenuItem href="/" text="Home" onClick={onMenuItemClick} />
            <MenuItemBlog onMenuItemClick={onMenuItemClick} />
            <MenuItem href="/portfolio" text="Portfolio" onClick={onMenuItemClick} />
            <MenuItem href="/projects" text="Projects" onClick={onMenuItemClick} />
            <MenuItem href="/social" text="SNS" onClick={onMenuItemClick} />
        </Menu>
    );
}

export interface OtherLinksProps extends MenusCommonProps {
    horizontal?: boolean;
}
export function OtherLinks({ horizontal, onMenuItemClick }: OtherLinksProps) {
    return (
        <Menu horizontal={horizontal}>
            <Menu.Item onClick={onMenuItemClick}>
                <Link href="/tatebou">Tatebou</Link>
            </Menu.Item>
            <Menu.Item onClick={onMenuItemClick}>
                <Link className="!text-accent" href="https://seppuku.club/">
                    Seppuku
                </Link>
            </Menu.Item>
        </Menu>
    );
}

function MenuItemBlog({ onMenuItemClick }: MenusCommonProps) {
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
                    <MenuItem href="/blog/1" text="Posts" onClick={onMenuItemClick} />
                    <MenuItem href="/blog/category" text="Categories" onClick={onMenuItemClick} />
                    <MenuItem href="/blog/tag" text="Tags" onClick={onMenuItemClick} />
                    <MenuItem href="/blog/about" text="About" onClick={onMenuItemClick} />
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
