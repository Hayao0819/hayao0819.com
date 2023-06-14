import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen flex-wrap">
            <div>
                <Header />
            </div>
            <div className="flex min-h-screen grow flex-col">
                <main className="grow p-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
