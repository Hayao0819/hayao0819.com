import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="sticky sm:fixed">
                <Header />
            </div>

            <main className="mt-16 grow p-4 leading-8 sm:ml-64 sm:mt-0">{children}</main>
            <div className="sm:ml-64">
                <Footer />
            </div>
        </div>
    );
}
