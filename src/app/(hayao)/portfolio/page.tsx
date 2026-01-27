import { BsRouter } from "react-icons/bs";
import {
    SiArchlinux,
    SiDocker,
    SiGnubash,
    SiGo,
    SiMui,
    SiNestjs,
    SiNextdotjs,
    SiNixos,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiVuedotjs,
} from "react-icons/si";
import { SiVisualstudiocode } from "react-icons-ms/si";

import { Link } from "@/components/elements/Link";
import { PortfolioItem } from "@/components/elements/PortfolioItem";
import { Section } from "@/components/elements/Section";
import { SkillItem } from "@/components/elements/SkillItem";
import { VerticalLabel } from "@/components/elements/VerticalLabel";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Portfolio & Skills" });

export default function Portfolio() {
    return (
        <div className="m-auto flex w-full max-w-4xl items-start justify-center p-4">
            <div className="border-border w-full border-4">
                <div className="grid grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                    <VerticalLabel as="h1" className="text-2xl font-black">
                        Portfolio
                    </VerticalLabel>
                    <div className="flex flex-col">
                        {/* Introduction */}
                        <Section>
                            <p className="text-sm leading-relaxed">
                                小学生の頃からLinuxが好きで、それに関連する制作物が多くあります。
                                大学生になってからはGolang、Rust、C++等も書き始め、プロダクション規模のウェブ開発も行っています。
                            </p>
                            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                <Link href="/something" className="border-border border-b-2 hover:border-b-4">
                                    その他の制作物一覧 →
                                </Link>
                                <Link href="/events" className="border-border border-b-2 hover:border-b-4">
                                    イベント参加記録 →
                                </Link>
                            </div>
                        </Section>

                        {/* Skills Section */}
                        <Section title="Skills" description="得意な技術スタック">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                <SkillItem icon={<SiNextdotjs />} name="Next.js" level="main" />
                                <SkillItem icon={<SiReact />} name="React" level="main" />
                                <SkillItem icon={<SiGo />} name="Go" level="main" />
                                <SkillItem icon={<SiTypescript />} name="TypeScript" level="main" />
                                <SkillItem icon={<SiTailwindcss />} name="Tailwind" level="sub" />
                                <SkillItem icon={<SiVuedotjs />} name="Vue.js" level="sub" />
                                <SkillItem icon={<SiNestjs />} name="NestJS" level="sub" />
                                <SkillItem icon={<SiGnubash />} name="Shell" level="sub" />
                            </div>
                        </Section>

                        {/* Languages & Frameworks */}
                        <Section title="Languages" description="使用言語と制作物">
                            <div className="grid gap-3 md:grid-cols-2">
                                <PortfolioItem icon={<SiGo />} name="Golang" projects={["lico", "ayaka", "stargazy"]} />
                                <PortfolioItem
                                    icon={<SiTypescript />}
                                    name="TypeScript"
                                    projects={["hayao0819.com", "Minskey"]}
                                />
                                <PortfolioItem icon={<SiGnubash />} name="ShellScript" projects={["nm-vpngate", "Tools"]} />
                                <PortfolioItem icon={<SiPython />} name="Python" projects={["archnews"]} />
                            </div>
                        </Section>

                        {/* Frameworks */}
                        <Section title="Frameworks" description="使用フレームワーク">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                <SkillItem icon={<SiReact />} name="React.js" />
                                <SkillItem icon={<SiVuedotjs />} name="Vue.js" />
                                <SkillItem icon={<SiNextdotjs />} name="Next.js" />
                                <SkillItem icon={<SiNestjs />} name="NestJS" />
                                <SkillItem icon={<SiTailwindcss />} name="Tailwind" />
                                <SkillItem icon={<SiMui />} name="MUI" />
                            </div>
                        </Section>

                        {/* Tools & Environment */}
                        <Section title="Environment" description="開発環境" isLast>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                <SkillItem icon={<SiArchlinux />} name="Arch Linux" />
                                <SkillItem icon={<SiNixos />} name="NixOS" />
                                <SkillItem icon={<SiVisualstudiocode />} name="VSCode" />
                                <SkillItem icon={<SiDocker />} name="Docker" />
                                <SkillItem icon={<BsRouter />} name="NEC IX2215" />
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}
