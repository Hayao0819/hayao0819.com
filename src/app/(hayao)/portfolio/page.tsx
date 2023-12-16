import { ReactNode } from "react";
import { FaGolang } from "react-icons/fa6";

import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";

export default function Portfolio() {
    return (
        <CommonSpacer>
            <Heading level={2}>Skills</Heading>
            <div className="flex">
                <SkillCard icon={<FaGolang />} title="Golang">
                    <p>何かを作ります</p>
                </SkillCard>
            </div>

            <h2 className="text-xl">Projects</h2>
            <ul>
                <li>何もない</li>
            </ul>
        </CommonSpacer>
    );
}

interface SkillCardProps {
    icon?: ReactNode;
    title: string;
    children?: ReactNode;
}
function SkillCard(props: SkillCardProps) {
    return (
        <div className="w-1/2 ">
            <div className=" flex items-center justify-center bg-neutral text-neutral-content child:mx-6">
                <div>{props.icon}</div>
                <p>{props.title}</p>
            </div>
            <div>{props.children}</div>
        </div>
    );
}
