import { memo } from "react";

import { Typewriter } from "@/components/elements/Typewriter";

const Home = () => (
    <div className="flex grow flex-col ">
        <div className="flex h-auto w-screen grow items-center justify-center bg-[rgba(0,0,0,0.7)] bg-hero-sp object-center text-base-100 bg-blend-darken md:justify-start md:bg-hero">
            <div className="flex justify-center text-center text-xl font-bold md:w-1/2 md:text-left md:text-4xl">
                <Typewriter
                    words={[
                        "山田ハヤオという群馬大学の学生です. \n低レイヤやセキュリティに興味があります.\nPC-98x1やLinux等広く浅く触れています.",
                    ]}
                    loop={1}
                    cursor={true}
                    cursorBlinking={true}
                />
            </div>
        </div>
    </div>
);

export default memo(Home);
