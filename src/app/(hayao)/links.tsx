"use client";

import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

import { Link } from "@/components/elements/Link";

export function InstagramLink() {
    return (
        <Link href="https://instagram.com/Hayao0819" className="flex items-center justify-center">
            <FaInstagram className="text-5xl" />
        </Link>
    );
}

export function TwitterLink() {
    return (
        <Link href="https://twitter.com/Hayao0819" className="flex items-center justify-center">
            <FaTwitter className="text-5xl" />
            {/* <div className="">
                <p>@Hayao0819</p>
                <p>@YamadaHayao</p>
            </div> */}
        </Link>
    );
}

export function GitHubLink() {
    return (
        <Link href="https://github.com/Hayao0819" className="flex items-center justify-center">
            <FaGithub className="text-github text-5xl" />
            {/* <div className="">
                <p>@Hayao0819</p>
            </div> */}
        </Link>
    );
}
