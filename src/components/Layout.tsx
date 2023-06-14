import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div className="sm:flex items-start">
            <Header />
            <div className="grow">
                <main className="p-4 w-full">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
