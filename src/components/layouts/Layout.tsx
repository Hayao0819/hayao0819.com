import classNames from "classnames";
import { useMemo } from "react";

import { Heading } from "../elements/Heading";
import { MainManus } from "./CommonMenu";
import Drawer from "./Drawer";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };

    const headerMemo = useMemo(() => <Header />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    const defaultClassName = "flex min-h-screen w-screen flex-col bg-base-200 text-base-content";

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

export function DrawerContent() {
    return (
        <div className="m-2">
            <div>
                <Heading level={2} className="text-center">
                    Yamada Hayao
                </Heading>
            </div>
            <MainManus />
        </div>
    );
}
