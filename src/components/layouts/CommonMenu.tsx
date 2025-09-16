"use client";

import { RefObject, useRef, useState } from "react";
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
            <MenuItem href="/skill" text="スキルセット" onClick={onMenuItemClick} />
            <MenuItem href="/projects" text="何か" onClick={onMenuItemClick} />
            <MenuItem href="/social" text="SNS" onClick={onMenuItemClick} />
        </Menu>
    );
}

export interface OtherLinksProps extends MenusCommonProps {
    horizontal?: boolean;
    className?: string;
}
export function OtherLinks({ horizontal, onMenuItemClick, className }: OtherLinksProps) {
    return (
        <Menu horizontal={horizontal} className={className}>
            <Menu.Item onClick={onMenuItemClick}>
                <Link href="/tatebou">縦棒</Link>
            </Menu.Item>
            <Menu.Item onClick={onMenuItemClick}>
                <Link className="" href="https://seppuku.club/">
                    切腹
                </Link>
            </Menu.Item>
        </Menu>
    );
}

function MenuItemBlog({ onMenuItemClick }: MenusCommonProps) {
    const [isOpened, setIsOpened] = useState(false);
    const detailsRef = useRef<HTMLDetailsElement>(null);

    // FIXME: Fix type assertion
    useOnClickOutside(detailsRef as RefObject<HTMLDetailsElement>, () => {
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
            <Link href={href} className="!w-fit !text-nowrap !text-inherit">
                {text}
            </Link>
        </Menu.Item>
    );
}
