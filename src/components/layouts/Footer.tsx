"use client";

import { ReactNode } from "react";
import { Footer as DaisyFooter } from "react-daisyui";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
    const FooterLink = (props: { href: string; icon: ReactNode; linktext: ReactNode }) => {
        return (
            <a className="flex items-center">
                <span className="pr-2">{}</span>
                <span>{props.linktext}</span>
            </a>
        );
    };

    return (
        <DaisyFooter className=" bg-base-300 p-10 text-lg text-base-content">
            <aside>
                <p>Yamada Hayao</p>
                <p className="text-sm">底辺大学生</p>
            </aside>
            <nav>
                <FooterLink href="" icon={<FaTwitter />} linktext="Twitter" />
            </nav>
        </DaisyFooter>
    );
}
