import classNames from "classnames";
import { useMemo } from "react";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };

    const headerMemo = useMemo(() => <Header />, []);
    const footerMemo = useMemo(() => <Footer />, []);

    return (
        <div
            {...props}
            className={classNames(
                "flex",
                "min-h-screen",
                "w-screen",
                "flex-col",
                "bg-base-100",
                "text-base-content",
                props.className,
            )}
        >
            {headerMemo}
            <main className={classNames("grow", "p-5", "flex")}>{props.children}</main>
            {footerMemo}
        </div>
    );
}
