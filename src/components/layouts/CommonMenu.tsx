"use client";

import classNames from "clsx";
import { RefObject, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
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
        <nav className={classNames("flex", horizontal ? "flex-row items-center" : "flex-col", className)}>
            <MenuItem href="/" text="Top" onClick={onMenuItemClick} horizontal={horizontal} first />
            <MenuItemBlog onMenuItemClick={onMenuItemClick} horizontal={horizontal} />
            <MenuItemProjects onMenuItemClick={onMenuItemClick} horizontal={horizontal} />
            <MenuItem href="/social" text="Social" onClick={onMenuItemClick} horizontal={horizontal} />
        </nav>
    );
}

export interface OtherLinksProps extends MenusCommonProps {
    horizontal?: boolean;
    className?: string;
}
export function OtherLinks({ horizontal, onMenuItemClick, className }: OtherLinksProps) {
    return (
        <nav
            className={classNames(
                "flex",
                horizontal ? "flex-row items-center" : "flex-col border-l-4 border-base-content",
                className,
            )}
        >
            <MenuItem href="/tatebou" text="縦棒" onClick={onMenuItemClick} horizontal={horizontal} />
            <MenuItem href="https://seppuku.club/" text="切腹" onClick={onMenuItemClick} horizontal={horizontal} />
        </nav>
    );
}

function MenuItemWithDropdown({
    label,
    items,
    onMenuItemClick,
    horizontal,
}: {
    label: string;
    items: { href: string; text: string }[];
    onMenuItemClick?: () => void;
    horizontal?: boolean;
}) {
    const [isOpened, setIsOpened] = useState(false);
    const detailsRef = useRef<HTMLDetailsElement>(null);

    useOnClickOutside(detailsRef as RefObject<HTMLDetailsElement>, () => {
        setIsOpened(false);
    });

    return (
        <details
            className="group relative"
            onClick={(e) => {
                e.preventDefault();
                setIsOpened(!isOpened);
            }}
            open={isOpened}
            ref={detailsRef}
        >
            <summary
                className={classNames(
                    "relative flex cursor-pointer list-none items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors [&::-webkit-details-marker]:hidden",
                    horizontal
                        ? [
                              "px-6 py-4",
                              "after:absolute after:bottom-2 after:left-1/2 after:h-1 after:w-0 after:bg-base-content after:transition-all after:duration-300",
                              "hover:after:left-0 hover:after:w-full",
                          ]
                        : "border-l-4 border-transparent px-6 py-3 hover:border-base-content hover:bg-base-content/5",
                )}
            >
                {label}
                <FaChevronDown
                    className={classNames("text-[10px] transition-transform duration-200", isOpened && "rotate-180")}
                />
            </summary>
            <nav
                className={classNames(
                    "z-50 min-w-[180px] border-4 border-base-content bg-base-100 shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
                    horizontal ? "absolute left-0 top-full" : "ml-4 mt-1 shadow-none",
                )}
            >
                {items.map((item) => (
                    <SubMenuItem
                        key={item.href}
                        href={item.href}
                        text={item.text}
                        onClick={onMenuItemClick}
                        horizontal={horizontal}
                    />
                ))}
            </nav>
        </details>
    );
}

function MenuItemBlog({ onMenuItemClick, horizontal }: MenusCommonProps & { horizontal?: boolean }) {
    return (
        <MenuItemWithDropdown
            label="Blog"
            items={[
                { href: "/blog/1", text: "記事一覧" },
                { href: "/blog/category/技術系/", text: "技術系" },
                { href: "/blog/tag", text: "タグ一覧" },
                { href: "/blog/about", text: "About" },
            ]}
            onMenuItemClick={onMenuItemClick}
            horizontal={horizontal}
        />
    );
}

function MenuItemProjects({ onMenuItemClick, horizontal }: MenusCommonProps & { horizontal?: boolean }) {
    return (
        <MenuItemWithDropdown
            label="Projects"
            items={[
                { href: "/portfolio", text: "スキル・制作物" },
                { href: "/something", text: "その他成果物" },
                { href: "/history", text: "経歴" },
                { href: "/events", text: "イベント参加" },
            ]}
            onMenuItemClick={onMenuItemClick}
            horizontal={horizontal}
        />
    );
}

function MenuItem({
    href,
    text,
    onClick,
    horizontal,
    first,
}: {
    href: string;
    text: string;
    onClick?: () => void;
    horizontal?: boolean;
    first?: boolean;
}) {
    // Horizontal (navbar) style: underline animation
    if (horizontal) {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={classNames(
                    "relative flex items-center py-4 text-sm font-bold uppercase tracking-wide transition-colors after:absolute after:bottom-2 after:h-1 after:w-0 after:bg-base-content after:transition-all after:duration-300",
                    first ? "px-8" : "px-6",
                    first
                        ? "after:left-[60%] hover:after:left-[12%] hover:after:w-[88%]"
                        : "after:left-1/2 hover:after:left-0 hover:after:w-full",
                )}
            >
                {text}
            </Link>
        );
    }

    // Vertical (drawer) style: left border on hover
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center border-l-4 border-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:border-base-content hover:bg-base-content/5"
        >
            {text}
        </Link>
    );
}

function SubMenuItem({
    href,
    text,
    onClick,
    horizontal,
}: {
    href: string;
    text: string;
    onClick?: () => void;
    horizontal?: boolean;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={classNames(
                "block text-sm font-medium transition-colors",
                horizontal
                    ? "border-b-2 border-base-content/20 px-5 py-4 last:border-b-0 hover:bg-base-content hover:text-base-100"
                    : "border-l-2 border-transparent py-2 pl-4 hover:border-base-content hover:bg-base-content/5",
            )}
        >
            {text}
        </Link>
    );
}
