"use client";

import NextLink from "next/link";
import { ReactNode } from "react";
import { FaBars } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Meta from "@/const/tatebou";

import TatebouFooter from "./Footer";
import Head from "./Head";

export default function TatebouLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head title="迫真縦棒短縮URL" description="縦な短縮URLを作成するサービスです" />

            <div className="flex h-screen flex-col">
                <NavBar>
                    <MenuContents />
                </NavBar>

                <main className="mx-auto w-4/5 grow py-12 *:leading-10 md:w-3/5">{children}</main>
                <TatebouFooter />
            </div>
        </>
    );
}

function NavBar({ children }: { children: ReactNode }) {
    return (
        <nav className="bg-muted flex w-full items-center px-4 py-2">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <FaBars />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-muted w-80 p-4">
                        <nav className="mt-8 flex flex-col space-y-2">
                            <MenuContents />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="mx-2 px-2 text-xl">
                <NextLink href="/tatebou">{Meta.title}</NextLink>
            </div>
            <div className="hidden md:flex">
                <nav className="flex items-center space-x-4">{children}</nav>
            </div>
        </nav>
    );
}

function MenuContents() {
    return (
        <>
            <MenuItem name="作者" link="/" />
            <MenuItem name="本家様" link="https://1lil.li/" />
            <MenuItem name="ドメイン所有者" link="https://yamad.me/" />
            <MenuItem name="ソースコード" link="https://github.com/Hayao0819/hayao0819.com/tree/dev/src/pages/tatebou" />
            <MenuItem name="バグ報告" link="https://github.com/Hayao0819/hayao0819.com/issues" />
            <MenuItem name="About" link="/tatebou/about" />
        </>
    );
}

function MenuItem({ name, link }: { name: string; link: string }) {
    return (
        <NextLink href={link} className="text-muted-foreground hover:text-foreground transition-colors">
            {name}
        </NextLink>
    );
}
