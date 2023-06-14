import { PC } from "./PC";
import { SP } from "./SP";
// import { default as NewSideBar } from "@/components/NewSidebar";

export default function Header() {
    return (
        <header>
            {/* Comment those to see new SideBar */}
            <PC />
            <SP />

            {/* Uncomment this to see new SideBar */}
            {/*<NewSideBar />*/}
        </header>
    );
}
