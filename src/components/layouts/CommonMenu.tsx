"use client";

import { useRef, useState } from "react";
import { Menu } from "react-daisyui";
import { useOnClickOutside } from "usehooks-ts";

import { Link } from "@/components/elements/Link";

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
            <MenuItem href="/" text="トップ" onClick={onMenuItemClick} />
            <MenuItemBlog onMenuItemClick={onMenuItemClick} />
            <MenuItem href="/portfolio" text="ポートフォリオ" onClick={onMenuItemClick} />
            <MenuItem href="/projects" text="Something" onClick={onMenuItemClick} />
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
                <Link href="/tatebou">縦棒</Link>
            </Menu.Item>
            <Menu.Item onClick={onMenuItemClick}>
                <Link className="!text-accent" href="https://seppuku.club/">
                    Let&apos;s get Seppukued!
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
                <summary>ブログ</summary>
                <Menu className="text-base-content">
                    <MenuItem href="/blog/1" text="記事一覧" onClick={onMenuItemClick} />
                    <MenuItem href="/blog/category/技術系/" text="技術系" onClick={onMenuItemClick} />
                    <MenuItem href="/blog/tag" text="タグ一覧" onClick={onMenuItemClick} />
                    <MenuItem href="/blog/about" text="筆者" onClick={onMenuItemClick} />
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
