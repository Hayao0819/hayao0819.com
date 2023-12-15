import Link from "next/link";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Home() {
    return (
        <div className="flex max-w-fit flex-col items-center justify-center child:m-2">
            <h1 className="text-5xl font-bold">山田ハヤオ</h1>

            <div className="flex w-full text-center child:child:mx-auto child:grow child:child:text-xl">
                <Link href="https://twitter.com/Hayao0819">
                    <FaTwitter />
                </Link>
                <Link href="https://instagram.com/Hayao0819">
                    <FaInstagram />
                </Link>
                <Link href="https://github.com/Hayao0819">
                    <FaGithub />
                </Link>
            </div>

            <p className="py-6">カスなおたく</p>
        </div>
    );
}
