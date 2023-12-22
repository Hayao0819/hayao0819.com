import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import {
    SiDocker,
    SiFirebase,
    SiGnubash,
    SiGo,
    SiLinux,
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
        <Heading level={2} className="my-5 w-full  py-3 text-center text-4xl">
            {children}
        </Heading>
    );
};

export default function Portfolio() {
    return (
        <CommonSpacer>
            <div>
                <PortfolioHeading>Languages</PortfolioHeading>
                <div className="md:grid md:grid-cols-2 md:gap-5">
                    <SkillCard icon={<SiGo />} title="Golang" side="left">
                        <ul>
                            <li>Lico</li>
                            <li>Ayaka</li>
                            <li>Stargazy</li>
                        </ul>
                    </SkillCard>
                    <SkillCard icon={<SiTypescript />} title="TypeScript" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiGnubash />} title="ShellScript" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiPython />} title="Python" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                </div>
            </div>

            <div>
                <PortfolioHeading>Frameworks</PortfolioHeading>
                <div className="md:grid md:grid-cols-2 md:gap-5">
                    <SkillCard icon={<SiReact />} title="React.js" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiVuedotjs />} title="Vue.js" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiTailwindcss />} title="Tailwind CSS" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiNextdotjs />} title="Next.js" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                </div>
            </div>

            <div>
                <PortfolioHeading>Tools</PortfolioHeading>
                <div className="md:grid md:grid-cols-2 md:gap-5">
                    <SkillCard icon={<SiLinux />} title="Linux" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiVisualstudiocode />} title="VSCode" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiFirebase />} title="Firestore" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
                    </SkillCard>
                    <SkillCard icon={<SiDocker />} title="Docker" side="left">
                        <Heading level={3}>成果物</Heading>
                        <p>色々を作りました</p>
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
            className={classNames("flex w-full", {
                "flex-row-reverse": props.side === "right",
            })}
        >
            <div className=" flex w-1/2 items-center justify-center bg-neutral px-10 py-12 text-neutral-content child:px-2">
                <span className="text-2xl">{props.icon}</span>
                <p className="text-2xl">{props.title}</p>
            </div>
            <div
                className={classNames("w-1/2 bg-base-300 px-6", {
                    "text-left": props.side === "left",
                    "text-right": props.side === "right",
                })}
            >
                {props.children}
            </div>
        </div>
    );
}
