import classNames from "classnames";
import { useMemo } from "react";

import Drawer from "./Drawer/Drawer";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };

    const headerMemo = useMemo(() => <Header />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    const defaultClassName = "flex min-h-screen w-screen flex-col bg-base-100 text-base-content";

    return (
        <>
            <Drawer />
            <div {...props} className={classNames(defaultClassName, props.className)}>
                {headerMemo}
                <main className={classNames("grow", "flex")}>{props.children}</main>
                {footerMemo}
            </div>
        </>
    );
}
