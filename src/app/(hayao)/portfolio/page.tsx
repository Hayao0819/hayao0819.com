import { ReactNode } from "react";
import { BsRouter } from "react-icons/bs";
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
    SiVuedotjs,
} from "react-icons/si";
import { SiVisualstudiocode } from "react-icons-ms/si";

import { Link } from "@/components/elements/Link";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Portfolio" });

export default function Portfolio() {
    return (
        <div className="m-auto flex w-fit items-start justify-center border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="row-span-1 border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">
                    Portfolio
                </h1>
                <div className="flex flex-col">
                    <div className="border-b-4 border-base-content p-4">
                        <p className="text-sm">
                            私は小学生の頃からLinuxが非常に好きだったので、それらに関連するものが多くあります。
                            大学生になってからはGolangやRust、C++等も書き始め、プロダクション規模のウェブサイトの開発も行うようになりました。
                        </p>
                        <p className="mt-2 text-sm">
                            <Link href="/something" className="underline">
                                制作物一覧はこちら
                            </Link>
                        </p>
                    </div>
                    <Section title="Languages">
                        <SkillItem icon={<SiGo />} name="Golang" links={["lico", "ayaka", "stargazy"]} />
                        <SkillItem icon={<SiTypescript />} name="TypeScript" links={["hayao0819.com"]} />
                        <SkillItem icon={<SiGnubash />} name="ShellScript" links={["nm-vpngate", "Tools"]} />
                        <SkillItem icon={<SiPython />} name="Python" links={["archnews"]} />
                    </Section>
                    <Section title="Frameworks">
                        <SkillItem icon={<SiReact />} name="React.js" />
                        <SkillItem icon={<SiVuedotjs />} name="Vue.js" />
                        <SkillItem icon={<SiTailwindcss />} name="Tailwind" />
                        <SkillItem icon={<SiNextdotjs />} name="Next.js" />
                        <SkillItem icon={<SiBootstrap />} name="Bootstrap" />
                    </Section>
                    <Section title="Tools">
                        <SkillItem icon={<SiArchlinux />} name="Linux" />
                        <SkillItem icon={<SiVisualstudiocode />} name="VSCode" />
                        <SkillItem icon={<SiDocker />} name="Docker" />
                    </Section>
                    <Section title="Network" isLast>
                        <SkillItem icon={<BsRouter />} name="NEC IX2215" />
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children, isLast }: { title: string; children: ReactNode; isLast?: boolean }) {
    return (
        <div className={`p-4 ${isLast ? "" : "border-b-4 border-base-content"}`}>
            <p className="mb-2 font-bold">{title}</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">{children}</div>
        </div>
    );
}

function SkillItem({ icon, name, links }: { icon: ReactNode; name: string; links?: string[] }) {
    return (
        <div className="flex flex-col items-center border border-base-content p-2">
            <span className="text-2xl">{icon}</span>
            <span className="text-sm">{name}</span>
            {links && (
                <div className="mt-1 flex flex-wrap justify-center gap-1 text-xs">
                    {links.map((link) => (
                        <span key={link} className="text-gray-500">
                            {link}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
