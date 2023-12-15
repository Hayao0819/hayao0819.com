"use client";

import Link from "next/link";
import { Button, Menu, Navbar } from "react-daisyui";

function MenuItem({ href, text }: { href: string; text: string }) {
    return (
        <Menu.Item>
            <Link href={href} className="!text-inherit">
                {text}
            </Link>
        </Menu.Item>
    );
}

export default function Header() {
    return (
        <Navbar className=" bg-neutral text-neutral-content active:text-neutral-content">
            <div>
                <Button className=" btn-ghost text-lg">Yamada Hayao</Button>
            </div>
            <div className="hidden grow sm:flex">
                <Navbar.Start>
                    <Menu horizontal>
                        <MenuItem href="/" text="Home" />
                        <Menu.Item>
                            <details className="dropdown">
                                <summary>Blog</summary>
                                <Menu className="text-base-content">
                                    <MenuItem href="/blog/1" text="Blog" />
                                    <MenuItem href="/blog/about" text="About" />
                                </Menu>
                            </details>
                        </Menu.Item>
                        <MenuItem href="/portfolio" text="Portfolio" />
                        <MenuItem href="/links" text="Links" />
                    </Menu>
                </Navbar.Start>
            </div>

            <Navbar.End>
                <Menu horizontal>
                    <Menu.Item>
                        <Link href="/tatebou">Tatebou</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link className="!bg-primary-content !text-primary" href="https://seppuku.club/">
                            Seppuku
                        </Link>
                    </Menu.Item>
                </Menu>
            </Navbar.End>
        </Navbar>
    );
}
