import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram, FaKeybase } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "SNS Links" });

export default function Links() {
    return (
        <div className="m-auto flex w-fit items-start justify-center border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[1fr_1fr] gap-0">
                <h1 className="row-span-2 border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">
                    Social
                </h1>
                <Link
                    href="https://github.com/Hayao0819"
                    className="flex items-center justify-center gap-2 border-b-4 border-r-4 border-base-content p-6"
                >
                    <FaGithub className="text-4xl" />
                    <p>GitHub</p>
                </Link>
                <Link
                    href="https://twitter.com/Hayao0819"
                    className="flex items-center justify-center gap-2 border-b-4 border-base-content p-6"
                >
                    <FaTwitter className="text-4xl" />
                    <p>Twitter</p>
                </Link>
                <Link
                    href="https://instagram.com/Hayao0819"
                    className="flex items-center justify-center gap-2 border-r-4 border-base-content p-6"
                >
                    <FaInstagram className="text-4xl" />
                    <p>Instagram</p>
                </Link>
                <Link href="https://keybase.io/hayao0819" className="flex items-center justify-center gap-2 p-6">
                    <FaKeybase className="text-4xl" />
                    <p>Keybase</p>
                </Link>
            </div>
        </div>
    );
}
