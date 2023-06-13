import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen flex-wrap">
            <div>
                <Header />
            </div>
            <div className="grow">
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    );
}
