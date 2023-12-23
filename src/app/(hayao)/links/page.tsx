import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

import CommonSpacer from "@/components/layouts/CommonSpacer";

export default function Links() {
    return (
        <CommonSpacer>
            <div>
                <Link href="https://github.com/Hayao0819" className="inline-flex items-center">
                    <FaGithub />
                    <p>GitHub</p>
                </Link>
                <Link href="https://twitter.com/Hayao0819" className="inline-flex items-center">
                    <FaTwitter />
                    <p>Twitter</p>
                </Link>
            </div>
        </CommonSpacer>
    );
}
