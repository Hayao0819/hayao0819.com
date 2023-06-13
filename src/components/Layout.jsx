import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="grid grid-cols-2">
        <header>
          <SideBar />
        </header>
        <main>{children}</main>
      </div>
      {Footer}
    </>
  );
}
