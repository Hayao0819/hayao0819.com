import classNames from "classnames";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import {
    SiArchlinux,
    SiBootstrap,
    SiDocker,
    SiGnubash,
    SiGo,
    SiNextdotjs,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiVisualstudiocode,
    SiVuedotjs,
} from "react-icons/si";

import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";

const PortfolioHeading: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Heading level={2} className="my-5 w-fit px-5 py-3 text-center text-4xl text-accent">
            {children}
        </Heading>
    );
};

export default function Portfolio() {
    return (
        <CommonSpacer>
            <div>
                <PortfolioHeading>Languages</PortfolioHeading>
                <div className="flex flex-col  gap-5 md:grid md:grid-cols-2">
                    <SkillCard icon={<SiGo />} title="Golang" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/lico">lico</SkillCardLink>
                            <SkillCardLink href="https://github.com/Hayao0819/ayaka">ayaka</SkillCardLink>
                            <SkillCardLink href="https://github.com/Hayao0819/stargazy">stargazy</SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                    <SkillCard icon={<SiTypescript />} title="TypeScript" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/hayao0819.com">hayao0819.com</SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                    <SkillCard icon={<SiGnubash />} title="ShellScript" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/nm-vpngate">nm-vpngate</SkillCardLink>
                            <SkillCardLink href="https://github.com/Hayao0819/Hayao-Tools">Tools</SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                    <SkillCard icon={<SiPython />} title="Python" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/Hayao-Tools/tree/master/archnews">
                                archnews
                            </SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                </div>
            </div>

            <div>
                <PortfolioHeading>Frameworks</PortfolioHeading>
                <div className="flex flex-col  gap-5 md:grid md:grid-cols-2">
                    <SkillCard icon={<SiReact />} title="React.js" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/hayao0819.com">hayao0819.com</SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                    <SkillCard icon={<SiVuedotjs />} title="Vue.js" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://www.spotwork.net/">SpotWORK</SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                    <SkillCard icon={<SiTailwindcss />} title="Tailwind CSS" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/hayao0819.com">hayao0819.com</SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                    <SkillCard icon={<SiNextdotjs />} title="Next.js" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/hayao0819.com">hayao0819.com</SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                    <SkillCard icon={<SiBootstrap />} title="Bootstrap" side="left">
                        <SkillCardLinkList>
                            <SkillCardLink href="https://github.com/Hayao0819/hayao-old-website/blob/master/index.html">
                                Old Website
                            </SkillCardLink>
                        </SkillCardLinkList>
                    </SkillCard>
                </div>
            </div>

            <div>
                <PortfolioHeading>Tools</PortfolioHeading>
                <div className="flex flex-col  gap-5 md:grid md:grid-cols-2">
                    <SkillCard icon={<SiArchlinux />} title="Linux" side="left">
                        <p className="">btw, I use Arch Linux.</p>
                    </SkillCard>
                    <SkillCard icon={<SiVisualstudiocode />} title="VSCode" side="left">
                        <p>無難</p>
                    </SkillCard>

                    <SkillCard icon={<SiDocker />} title="Docker" side="left">
                        <p>いろんな開発やデプロイに</p>
                    </SkillCard>
                </div>
            </div>
        </CommonSpacer>
    );
}

interface SkillCardProps {
    icon?: ReactNode;
    title: string;
    children?: ReactNode;
    side: "left" | "right";
}
function SkillCard(props: SkillCardProps) {
    return (
        <div
            className={classNames("flex w-full shadow-lg", {
                "flex-row-reverse": props.side === "right",
            })}
        >
            <div className=" flex w-1/2 items-center justify-center px-10 py-12 child:px-2">
                <span className="text-2xl">{props.icon}</span>
                <p className="text-2xl">{props.title}</p>
            </div>
            <div
                className={
                    "w-1/2 bg-base-200 text-center p-6 flex flex-col items-center justify-center font-bold " +
                    classNames({
                        "text-left": props.side === "left",
                        "text-right": props.side === "right",
                    })
                }
            >
                {props.children}
            </div>
        </div>
    );
}

function SkillCardLinkList(props: { children: ReactNode }) {
    return <ul className="list-none">{props.children}</ul>;
}

function SkillCardLink(props: { href: string; children: ReactNode }) {
    return (
        <li className="py-1">
            <Link className="" href={props.href}>
                {props.children}
            </Link>
        </li>
    );
}
