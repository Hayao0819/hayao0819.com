"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Footer as DaisyFooter } from "react-daisyui";
import { FaGithub, FaTwitter } from "react-icons/fa6";

export default function Footer() {
    const FooterLink = (props: { href: string; icon: ReactNode; linktext: ReactNode }) => {
        return (
            <a
                className="flex items-center underline-offset-4 hover:underline"
                href={props.href}
                target="_blank"
                rel="noreferrer"
            >
                <span>{props.icon}</span>
                <span>{props.linktext}</span>
            </a>
        );
    };

    const pathName = usePathname();

    if (pathName === "/") {
        return null;
    }

    return (
        <DaisyFooter className="bg-secondary px-10 py-8 text-lg text-secondary-content shadow-xl">
            <aside>
                <p>Yamada Hayao</p>
                <p className="text-sm">パソコンをカタカタ触るのが趣味の底辺大学生</p>
            </aside>
            <nav>
                <FooterLink href="https://twitter.com/Hayao0819" icon={<FaTwitter />} linktext="Twitter" />
                <FooterLink href="https://github.com/Hayao0819" icon={<FaGithub />} linktext="GitHub" />
            </nav>
        </DaisyFooter>
    );
}
