import classNames from "clsx";
import { useMemo } from "react";

import Drawer, { DrawerContent } from "./Drawer";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };

    const headerMemo = useMemo(() => <Header />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    const defaultClassName = "flex h-full w-full min-h-svh flex-col bg-background text-foreground";

    return (
        <>
            <Drawer>
                <DrawerContent />
            </Drawer>
            <div {...props} id="page-shell" className={classNames(defaultClassName, props.className)}>
                <a href="#main" className="skip-link tracked-caps text-[11px]">
                    本文へスキップ
                </a>
                {headerMemo}
                <main id="main" tabIndex={-1} className="flex h-full grow outline-none">
                    {props.children}
                </main>
                {footerMemo}
            </div>
        </>
    );
}
