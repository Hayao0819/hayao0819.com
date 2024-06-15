import { Link } from "next-view-transitions";

import Links from "./links";

export default function Home() {
    return (
        <div className="m-auto flex h-full  w-fit flex-col items-center justify-center child:m-2">
            <h1 className="text-5xl font-bold">山田ハヤオ</h1>

            <div className="flex w-full text-center child:child:mx-auto child:grow child:child:text-xl">
                <Links />
            </div>

            <div className="flex flex-col items-center gap-5">
                <Link className="text-accent hover:underline" href="/me">
                    About Me
                </Link>
                <Link className="hover:underline" href="/playground/niconico/">
                    ニコニコ動画検索
                </Link>

                <Link className="hover:underline" href="/blog">
                    BLOG
                </Link>
                <Link className="hover:underline" href="/portfolio">
                    PORTFOLIO
                </Link>
            </div>
        </div>
    );
}
