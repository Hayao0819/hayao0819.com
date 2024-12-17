import classNames from "clsx";
import { useMemo } from "react";

import Drawer, { DrawerContent } from "./Drawer";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };

    const headerMemo = useMemo(() => <Header />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    const defaultClassName = "flex h-full w-full min-h-svh flex-col bg-base-100 text-base-content";

    return (
        <>
            <Drawer>
                <DrawerContent />
            </Drawer>
            <div {...props} className={classNames(defaultClassName, props.className)}>
                {headerMemo}
                <main className="flex h-full grow">{props.children}</main>
                {footerMemo}
            </div>
        </>
    );
}
