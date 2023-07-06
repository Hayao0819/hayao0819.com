import { SiGnubash, SiGo, SiLinux } from "@icons-pack/react-simple-icons";
import { ReactNode } from "react";

import { H2 } from "@/components/elements/Headlines";

export default function Skill() {
    return (
        <>
            <H2>スキル</H2>
            <div className="flex flex-wrap items-start">
                <SkillCard name="Golang" icon={SiGo}>
                    <p>何もわからん</p>
                </SkillCard>
                <SkillCard name="Bash" icon={SiGnubash}>
                    <p>何もわからん</p>
                </SkillCard>
                <SkillCard name="Linux" icon={SiLinux}>
                    <p>何もわからん</p>
                </SkillCard>
            </div>
        </>
    );
}

interface SkillProps {
    children?: ReactNode;
    name: string;
    icon: any; //ライブラリのせいでAnyになっている
}
function SkillCard(props: SkillProps) {
    return (
        <div tabIndex={0} className="daisy-collapse daisy-collapse-plus m-2 w-auto flex-wrap border border-base-300 bg-base-200">
            <div className="daisy-collapse-title w-52 min-w-fit text-xl font-medium">
                <span className="child:mr-1 child:inline">
                    <props.icon />{" "}
                </span>
                {props.name}
            </div>
            <div className="daisy-collapse-content">{props.children}</div>
        </div>
    );
}
