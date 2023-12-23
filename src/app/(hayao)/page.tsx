import Link from "next/link";

import Links from "./links";

export default function Home() {
    return (
        <div className="m-auto flex h-full  w-fit flex-col items-center justify-center child:m-2">
            <h1 className="text-5xl font-bold">山田ハヤオ</h1>

            <div className="flex w-full text-center child:child:mx-auto child:grow child:child:text-xl">
                <Links />
            </div>

            <p className="py-1 hover:underline">
                <Link href="/blog">BLOG</Link>
            </p>
            <p className="py-1 hover:underline">
                <Link href="/portfolio">PORTFOLIO</Link>
            </p>
        </div>
    );
}
