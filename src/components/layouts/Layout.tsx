import { Button, Menu, Navbar } from "react-daisyui";
import { FaTwitter } from "react-icons/fa";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Layout(props: LayoutProps) {
    return (
        <div className="bg-base-100">
            <Header />
            <Main {...props} />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <>
            <Navbar className="bg-base-300">
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
                            <a href="">
                                <FaTwitter />
                            </a>
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
    return <></>;
}
