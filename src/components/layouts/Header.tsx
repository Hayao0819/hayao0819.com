"use client";

import Link from "next/link";
import { Button, Menu, Navbar } from "react-daisyui";

export default function Header() {
    return (
        <Navbar className="bg-base-300 text-base-content">
            <div>
                <Button className=" btn-ghost text-lg">Yamada Hayao</Button>
            </div>
            <div className="hidden grow sm:flex">
                <Menu horizontal>
                    <Menu.Item>
                        <Link href="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <details className="dropdown">
                            <summary>Blog</summary>
                            <Menu>
                                <Menu.Item>
                                    <Link href="/blog/1">Blog</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href="/blog/about">About</Link>
                                </Menu.Item>
                            </Menu>
                        </details>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/portfolio">Portfolio</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/links">Links</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div>
                <Menu horizontal>
                    <Menu.Item>
                        <Link href="/tatebou">Tatebou</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Navbar>
    );
}
