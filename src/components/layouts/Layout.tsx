import classNames from "classnames";
import { useMemo } from "react";

import Drawer, { DrawerContent } from "./Drawer";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };

    const headerMemo = useMemo(() => <Header />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    const defaultClassName = "flex min-h-svh w-screen flex-col bg-base-200 text-base-content";

    return (
        <>
            <Drawer>
                <DrawerContent />
            </Drawer>
            <div {...props} className={classNames(defaultClassName, props.className)}>
                {headerMemo}
                <main className={classNames("grow", "flex")}>{props.children}</main>
                {footerMemo}
            </div>
        </>
    );
}
