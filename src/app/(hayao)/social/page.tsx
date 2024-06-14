import { Link } from "next-view-transitions";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram, FaKeybase } from "react-icons/fa6";

import CommonSpacer from "@/components/layouts/CommonSpacer";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "SNS Links" });

export default function Links() {
    return (
        <CommonSpacer>
            <div className="mx-auto flex max-w-5xl basis-1 flex-wrap gap-2 text-xl  child:flex child:child:w-1/2 child:w-full child:items-center child:justify-center child:p-5 child:text-center child:shadow-sm">
                <Link href="https://github.com/Hayao0819" className=" bg-github text-base-100">
                    <FaGithub className="text-4xl" />
                    <p>GitHub</p>
                </Link>
                <Link href="https://instagram.com/Hayao0819" className="bg-instagram text-base-100">
                    <FaInstagram className="text-4xl" />
                    <p>Instagram</p>
                </Link>
                <Link href="https://keybase.io/hayao0819" className=" bg-kaybase text-base-100">
                    <FaKeybase className="text-4xl" />
                    <p>Keybase</p>
                </Link>

                <Link href="https://twitter.com/Hayao0819" className="bg-twitter text-base-100">
                    <FaTwitter className="text-4xl" />
                    <p>Twitter</p>
                </Link>
            </div>
        </CommonSpacer>
    );
}
