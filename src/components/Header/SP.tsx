import { Button as SidebarButton } from "@/components/Sidebar";
import Metadata from "@/const/meta";

export function SP() {
    return (
        <div className="sticky top-0 z-50 flex w-screen items-center justify-center bg-gray-900 text-white sm:hidden">
            <SidebarButton />
            <h1 className=" mx-auto">{Metadata.title}</h1>
        </div>
    );
}
