import Link from "next/link";

import Links from "./links";

export default function Home() {
    return (
        <div className="m-auto flex h-full  w-fit flex-col items-center justify-center child:m-2">
            <h1 className="text-5xl font-bold">山田ハヤオ</h1>

            <div className="flex w-full text-center child:child:mx-auto child:grow child:child:text-xl">
                <Links />
            </div>

            <div className="flex flex-col items-center gap-5 hover:underline">
                <Link className="text-accent" href="/about">
                    About Me
                </Link>
                <Link className="" href="/blog">
                    BLOG
                </Link>
                <Link className="" href="/portfolio">
                    PORTFOLIO
                </Link>
            </div>
        </div>
    );
}