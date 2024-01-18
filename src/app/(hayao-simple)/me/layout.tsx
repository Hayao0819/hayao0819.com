import Link from "next/link";
import { ReactNode } from "react";
import { FaCircle } from "react-icons/fa6";

export default function MeLayout(props: { children: ReactNode }) {
    return (
        <div className="flex h-full w-svw  font-gothic !text-black">
            <MeSideBar />
            <div className="grow border-l-[1px] border-black pl-2 ">
                <div className="child:mx-auto">{props.children}</div>
            </div>
        </div>
    );
}

const MeSideBar = () => {
    const Circle = ({ className }: { className?: string }) => {
        return <FaCircle className={className + " w-[10px]"} />;
    };

    return (
        <div className="border-r-[5px] border-[#aaaaaa] bg-[#F0F0FF] ">
            <input type="checkbox" className="peer hidden" id="menu-open-btn" />
            <label
                htmlFor="menu-open-btn"
                className=" block h-full w-8 peer-checked:h-6 peer-checked:w-full peer-checked:after:content-['✕'] md:hidden "
            />

            <div className="hidden h-svh w-1/5 min-w-48  peer-checked:!block md:block">
                <ul className=" ml-6 flex h-full flex-col text-blue-600 underline child:my-4 child:child:flex child:child:items-center child:child:gap-2 ">
                    <span></span>
                    <li>
                        <Link rel="prefetch" href="/me">
                            <Circle className="text-[#FFCCCC]" />
                            トップ
                        </Link>
                    </li>
                    <li>
                        <Link rel="prefetch" href="/me/env">
                            <Circle className="text-[#00FF00]" />
                            環境
                        </Link>
                    </li>
                    <li>
                        <Link rel="prefetch" href="/blog">
                            <Circle className="text-[#33FFFF]" />
                            ブログ
                        </Link>
                    </li>
                    <li>
                        <Link rel="prefetch" href="/health">
                            <Circle className="text-[#0099FF]" />
                            身体
                        </Link>
                    </li>
                    <li>
                        <Link rel="prefetch" href="/social">
                            <Circle className="text-[#333399]" />
                            SNS
                        </Link>
                    </li>

                    <li>
                        <Link rel="prefetch" href="/gyagu">
                            <Circle className="text-[#CC00CC]" />
                            ギャグ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
