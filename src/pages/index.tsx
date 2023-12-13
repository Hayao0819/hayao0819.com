import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

import Layout from "@/components/layouts/Layout";

export default function Home() {
    return (
        <Layout className="flex max-w-fit flex-col items-center justify-center child:m-2">
            <h1 className="text-5xl font-bold">山田ハヤオ</h1>

            <div className="flex w-full text-center child:child:mx-auto child:grow child:child:text-xl">
                <a href="https://twitter.com/Hayao0819">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com/Hayao0819">
                    <FaInstagram />
                </a>
                <a href="https://github.com/Hayao0819">
                    <FaGithub />
                </a>
            </div>

            <p className="py-6">カスなおたく</p>
        </Layout>
    );
}
