import classNames from "classnames";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    //const propsWithoutChildren = { ...props, children: undefined };

    return (
        <div {...props} className={classNames("flex", "min-h-screen", "flex-col", "bg-base-100", props.className)}>
            <Header />
            <main className={classNames("grow", "w-screen", "p-5")}>{props.children}</main>
            <Footer />
        </div>
    );
}
