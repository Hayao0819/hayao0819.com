import { memo } from "react";

import { Typewriter } from "@/components/elements/Typewriter";
import { Button } from "@/components/ui/button";

const Home = () => (
    <div className="flex grow flex-col">
        <div className="bg-hero-sp text-background md:bg-hero flex h-auto w-screen grow items-center justify-center bg-[rgba(0,0,0,0.7)] object-center bg-blend-darken md:justify-start">
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
                    <Button
                        variant="outline"
                        className="border-background text-background hover:bg-background hover:text-foreground"
                    >
                        ブログ
                    </Button>
                    <Button
                        variant="outline"
                        className="border-background text-background hover:bg-background hover:text-foreground"
                    >
                        ポートフォリオ
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

export default memo(Home);
