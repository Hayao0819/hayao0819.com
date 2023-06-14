import { ReactNode, useState } from "react";
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
            <aside id="sidebar" className="hidden w-64 flex-col bg-gray-900 px-4 text-white sm:block sm:h-screen">
                <div>{children}</div>
            </aside>
        </sideBarContext.Provider>
    );
}

export { Button } from "./Button";
