import { ReactNode } from "react";
import { FaCircle } from "react-icons/fa6";

export default function MeLayout(props: { children: ReactNode }) {
    return (
        <div className="flex h-svh w-svw font-gothic  !text-black">
            <MeSideBar />
            <div className=" grow border-l-[1px] border-black ">{props.children}</div>
        </div>
    );
}

const MeSideBar = () => {
    const Circle = ({ className }: { className?: string }) => {
        return <FaCircle className={className + " w-[10px]"} />;
    };

    return (
        <div className="w-1/5 border-r-[5px] border-[#aaaaaa] bg-[#F0F0FF]">
            <ul className="ml-6 flex flex-col text-blue-600 underline child:my-4 child:flex child:items-center child:gap-2">
                <span></span>
                <li>
                    <Circle className="text-[#FFCCCC]" />
                    トップ
                </li>
                <li>
                    <Circle className="text-[#00FF00]" />
                    ブログ
                </li>
                <li>
                    <Circle className="text-[#33FFFF]" />
                    ポートフォリオ
                </li>
                <li>
                    <Circle className="text-[#0099FF]" />
                    スキル
                </li>
                <li>
                    <Circle className="text-[#333399]" />
                    SNS
                </li>

                <li>
                    <Circle className="text-[#CC00CC]" />
                    管理者
                </li>
            </ul>
        </div>
    );
};
