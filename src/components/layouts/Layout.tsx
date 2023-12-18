import classNames from "classnames";
import { ReactNode, useMemo } from "react";

import DrawerSide from "./DrawerSide";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };
    const drawerId = "drawer";

    const headerMemo = useMemo(() => <Header drawerId={drawerId} />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    const defaultClassName = "flex min-h-screen w-screen flex-col bg-base-100 text-base-content";

    return (
        <div {...props} className={classNames(defaultClassName, props.className)}>
            <Drawer side={<DrawerSide />} id={drawerId}>
                {headerMemo}

                <main className={classNames("grow", "flex")}>{props.children}</main>
                {footerMemo}
            </Drawer>
        </div>
    );
}

export function Drawer({ children, side, id }: { children: ReactNode; side: ReactNode; id: string }) {
    return (
        <div className="drawer h-full">
            <input id={id} type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">{children}</div>
            <div className="drawer-side">
                <label htmlFor={id} aria-label="close sidebar" className="drawer-overlay" />
                {side}
            </div>
        </div>
    );
}
