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
            <div className="sm:grow sm:flex sm:flex-col">
                <main className="sm:grow p-4 w-full">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
