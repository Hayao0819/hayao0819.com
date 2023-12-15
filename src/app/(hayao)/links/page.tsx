import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function Links() {
    return (
        <>
            <Link href="https://github.com/Hayao0819">
                <FaGithub />
            </Link>
            <Link href="https://twitter.com/Hayao0819">
                <FaTwitter />
            </Link>
        </>
    );
}
