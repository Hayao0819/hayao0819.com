import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div className="flex flex-wrap sm:flex-row min-h-screen">
            <Header />
            <div>
                <main className="p-4">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
