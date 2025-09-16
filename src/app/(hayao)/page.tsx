import { Link } from "@/components/elements/Link";

import { GitHubLink, InstagramLink, TwitterLink } from "./links";

export default function Home() {
    return (
        <div className="m-auto flex h-full w-fit items-center justify-center border-4 border-base-content">
            <div className="grid grid-cols-4 grid-rows-4 justify-center gap-0 child:h-full">
                <div className="col-start-1 row-span-4">
                    <h1 className="border-r-4 border-base-content p-4 text-5xl font-bold [writing-mode:vertical-lr]">
                        <Link href="/me">山田ハヤオ</Link>
                    </h1>
                </div>
                <div className="col-start-2 flex items-center justify-center border-b-4 border-base-content px-3">
                    <TwitterLink />
                </div>
                <div className="col-start-3 flex items-center justify-center border-b-4 border-base-content">
                    <InstagramLink />
                </div>
                <div className="col-start-4 flex items-center justify-center border-b-4 border-base-content">
                    <GitHubLink />
                </div>
                <div className="col-span-3 col-start-2 row-start-2 flex items-center justify-center border-b-4 border-base-content text-center text-3xl">
                    <Link href="/me">About Me</Link>
                </div>
                <div className="col-span-3 col-start-2 row-start-3 flex items-center justify-center border-b-4 border-base-content text-center text-3xl">
                    <Link href="/blog">BLOG</Link>
                </div>
                <div className="col-span-3 col-start-2 row-start-4 flex items-center justify-center border-base-content text-center text-3xl">
                    <Link href="/portfolio">PORTFOLIO</Link>
                </div>
            </div>
        </div>
    );
}
