import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="grid grid-cols-2">
        <header>
          <SideBar />
        </header>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
