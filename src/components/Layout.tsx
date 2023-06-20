import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewHeader from "./NewHeader";

interface Props {
    children: React.ReactNode;
}

export function Layout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="sticky sm:fixed">
                <Header />
            </div>

            <div className="mt-16 grow p-4 leading-8 sm:ml-64 sm:mt-0">
                <main>{children}</main>
            </div>
            <div className="sm:ml-64">
                <Footer />
            </div>
        </div>
    );
}

export function NewLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="">
                <NewHeader></NewHeader>
            </div>

            <div className="grow p-4 leading-8"><main>{children}</main></div>
            <div className=""><Footer></Footer></div>
        </div>
    );
}

export default Layout
