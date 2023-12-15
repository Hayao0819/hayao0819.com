"use client";

import classNames from "classnames";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { Button, Footer as DaisyFooter, Menu, Navbar } from "react-daisyui";
import { FaTwitter } from "react-icons/fa";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    const headerMemo = useMemo(() => <Header />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    return (
        <div className="flex min-h-screen flex-col bg-base-100">
            {headerMemo}

            <Main {...props} className={classNames(props.className, "grow")} />

            {footerMemo}
        </div>
    );
}

function Header() {
    return (
        <>
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
                            <details>
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
        </>
    );
}

function Main(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props} />;
}

function Footer() {
    const FooterLink = (props: { href: string; icon: ReactNode; linktext: ReactNode }) => {
        return (
            <a className="flex items-center">
                <span className="pr-2">{}</span>
                <span>{props.linktext}</span>
            </a>
        );
    };

    return (
        <DaisyFooter className=" bg-neutral p-10 text-lg text-neutral-content">
            <aside>
                <p>Yamada Hayao</p>
                <p className="text-sm">底辺大学生</p>
            </aside>
            <nav>
                <FooterLink href="" icon={<FaTwitter />} linktext="Twitter" />
            </nav>
        </DaisyFooter>
    );
}
