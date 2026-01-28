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
        <nav className={classNames("flex", horizontal ? "flex-row items-center" : "flex-col", className)}>
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
                    "relative flex cursor-pointer list-none items-center gap-1 text-sm font-bold tracking-wide uppercase transition-colors [&::-webkit-details-marker]:hidden",
                    horizontal
                        ? [
                              "px-6 py-4",
                              "after:bg-foreground after:absolute after:bottom-2 after:left-1/2 after:h-1 after:w-0 after:transition-all after:duration-300",
                              "hover:after:left-0 hover:after:w-full",
                          ]
                        : "hover:border-border hover:bg-foreground/5 border-l-4 border-transparent px-6 py-3",
                )}
            >
                {label}
                <FaChevronDown
                    className={classNames("text-[10px] transition-transform duration-200", isOpened && "rotate-180")}
                />
            </summary>
            <nav
                className={classNames(
                    "bg-background z-50 min-w-[180px]",
                    horizontal
                        ? "border-border absolute top-full left-0 border-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                        : "mt-1 ml-4",
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
                    "after:bg-foreground relative flex items-center py-4 text-sm font-bold tracking-wide uppercase transition-colors after:absolute after:bottom-2 after:h-1 after:w-0 after:transition-all after:duration-300",
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
            className="hover:border-border hover:bg-foreground/5 flex items-center border-l-4 border-transparent px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors"
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
                    ? "border-border/20 hover:bg-foreground hover:text-background border-b-2 px-5 py-4 last:border-b-0"
                    : "hover:border-border hover:bg-foreground/5 border-l-2 border-transparent py-2 pl-4",
            )}
        >
            {text}
        </Link>
    );
}
