import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div className="sm:flex">
            <Header />
            <div className="sm:flex sm:grow sm:flex-col">
                <main className="w-full p-4 sm:grow">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
