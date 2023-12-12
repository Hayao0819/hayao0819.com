import classNames from "classnames";
import { ReactNode } from "react";
import { Button, Footer as DaisyFooter, Menu, Navbar } from "react-daisyui";
import { FaTwitter } from "react-icons/fa";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    sidebar?: ReactNode;
}

export default function Layout(props: LayoutProps) {
    const [mainProps, sidebar] = (function () {
        const { sidebar, ...mainProps } = props;
        return [mainProps, sidebar];
    })();

    return (
        <div className="flex min-h-screen flex-col bg-base-100">
            <Header />
            <div className="flex w-4/5 max-w-7xl grow  justify-center child:m-12">
                <Main {...mainProps} className={classNames(mainProps.className, "w-4/5")} />
                {sidebar ? <RightSidebar className={classNames("w-1/5")}>{sidebar}</RightSidebar> : null}
            </div>

            <Footer />
        </div>
    );
}

function Header() {
    return (
        <>
            <Navbar className="bg-base-300 text-base-content">
                <div>
                    <Button className=" btn-ghost text-lg">Yamada Hayao</Button>
                </div>
                <div className="hidden grow sm:flex">
                    <Menu horizontal>
                        <Menu.Item>
                            <a href="/">Home</a>
                        </Menu.Item>
                        <Menu.Item>
                            <details>
                                <summary>Blog</summary>
                                <Menu>
                                    <Menu.Item>
                                        <a href="/blog">Blog</a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a href="/blog/about">About</a>
                                    </Menu.Item>
                                </Menu>
                            </details>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="/tatebou">Tatebou</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="/">About</a>
                        </Menu.Item>
                    </Menu>
                </div>
                <div>
                    <Menu horizontal>
                        <Menu.Item>
                            <a href=""></a>
                        </Menu.Item>
                    </Menu>
                </div>
            </Navbar>
        </>
    );
}

function Main(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props} />;
}

function Footer() {
    const FooterLink = (props: { href: string; icon: ReactNode; linktext: ReactNode }) => {
        return (
            <a className="flex items-center">
                <span className="pr-2">{}</span>
                <span>{props.linktext}</span>
            </a>
        );
    };

    return (
        <DaisyFooter className=" bg-neutral p-10 text-lg text-neutral-content">
            <aside>
                <p>Yamada Hayao</p>
                <p className="text-sm">底辺大学生</p>
            </aside>
            <nav>
                <FooterLink href="" icon={<FaTwitter />} linktext="Twitter" />
            </nav>
        </DaisyFooter>
    );
}

function RightSidebar(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>{props.children}</div>;
}
