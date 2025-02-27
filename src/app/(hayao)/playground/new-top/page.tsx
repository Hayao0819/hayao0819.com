import { memo } from "react";

import { Typewriter } from "@/components/elements/Typewriter";

const Home = () => (
    <div className="flex grow flex-col ">
        <div className="flex h-auto w-screen grow items-center justify-center bg-[rgba(0,0,0,0.7)] bg-hero-sp object-center text-base-100 bg-blend-darken md:justify-start md:bg-hero">
            <div className="mx-12 flex flex-col justify-center gap-8 text-center text-xl font-bold md:w-1/2 md:text-left md:text-4xl">
                <Typewriter
                    words={[
                        "山田ハヤオという群馬大学の学生です. \n低レイヤやセキュリティに興味があります.\nセキュリティからレトロPCまで広く深く触れています.",
                    ]}
                    loop={1}
                    cursor={true}
                    cursorBlinking={true}
                />
                <div className="flex gap-4">
                    <button className="btn">ブログ</button>
                    <button className="btn">ポートフォリオ</button>
                </div>
            </div>
        </div>
    </div>
);

export default memo(Home);
