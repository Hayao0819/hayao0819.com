import classNames from "classnames";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex h-screen min-h-screen flex-col bg-base-100">
            <Header />
            <Main {...props} className={classNames(props.className, "grow", "w-screen", "h-full", "p-5")} />
            <Footer />
        </div>
    );
}

function Main(props: React.HTMLAttributes<HTMLDivElement>) {
    return <main {...props} />;
}
