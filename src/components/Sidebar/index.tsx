import { ReactNode, useState, JSX } from "react";
import { sideBarContext } from "@/context/SideBar";

interface SidebarProps {
    children: ReactNode;
}

export function SideBar({ children }: SidebarProps) {
    const [isOpened, setOpened] = useState(true);

    return (
        // sideBarContextの内容でいい感じに表示内容を分岐させたいけど方法がわからん
        // そもそもProviderとかいう謎のコンポーネントをなんで使わなきゃいけないのだ
        //グローバル変数でuseStateをそのまま使えればいいだけの話だと思う
        <sideBarContext.Provider value={{ isOpened, setOpened }}>
            <SideBarContents showSideBar={isOpened}>{children}</SideBarContents>
        </sideBarContext.Provider>
    );
}

interface SideBarContentsProps {
    children: ReactNode;
    showSideBar: boolean;
}
function SideBarContents({ children, showSideBar }: SideBarContentsProps): JSX.Element {
    console.log(showSideBar);
    if (showSideBar) {
        return (
            <aside id="sidebar" className="hidden flex-col bg-gray-900 px-4 text-white marker:w-64 sm:block sm:h-full sm:min-h-screen">
                <div>{children}</div>
            </aside>
        );
    } else {
        return <></>;
    }
}

export { Button } from "./Button";
