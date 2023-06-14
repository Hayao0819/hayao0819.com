import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div className="flex flex-wrap">
            <div>
                <Header />
            </div>
            <div className="flex min-h-screen grow flex-col">
                <main className="grow p-4">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
