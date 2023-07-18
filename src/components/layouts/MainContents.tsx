import { ReactNode } from "react";

import Footer from "@/components/layouts/Footer";

import Header from "./Header";

export default function DrawerContents({ children }: { children: ReactNode }) {
    return (
        <div className="daisy-drawer-content flex min-h-screen flex-col items-center justify-center">
            <Header />
            <main className="m-4 w-full grow p-4 leading-8">{children}</main>
            <Footer />
        </div>
    );
}
