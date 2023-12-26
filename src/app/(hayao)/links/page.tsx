import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import CommonSpacer from "@/components/layouts/CommonSpacer";

export default function Links() {
    return (
        <CommonSpacer>
            <div className=" flex flex-wrap text-xl child:flex child:h-80  child:w-80 child:flex-col child:items-center child:justify-center child:p-5">
                <Link href="https://github.com/Hayao0819" className=" bg-github text-base-100">
                    <FaGithub className="text-4xl" />
                    <p>GitHub</p>
                </Link>
                <Link href="https://instagram.com/Hayao0819" className="bg-instagram text-base-100">
                    <FaInstagram className="text-4xl" />
                    <p>Instagram</p>
                </Link>

                <Link href="https://twitter.com/Hayao0819" className="bg-twitter text-base-100">
                    <FaTwitter className="text-4xl" />
                    <p>Twitter</p>
                </Link>
            </div>
        </CommonSpacer>
    );
}
