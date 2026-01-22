import { ReactNode } from "react";
import { SiArchlinux, SiGo, SiMui, SiNestjs, SiNextdotjs, SiNixos, SiReact, SiTailwindcss, SiVuedotjs } from "react-icons/si";

import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Skill" });

export default function Skill() {
    return (
        <div className="m-auto flex w-fit items-start justify-center border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="row-span-1 border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">
                    Skill
                </h1>
                <div className="flex flex-col">
                    <Section title="Web">
                        <SkillItem icon={<SiNextdotjs />} name="Next.js" />
                        <SkillItem icon={<SiReact />} name="React.js" />
                        <SkillItem icon={<SiVuedotjs />} name="Vue.js" />
                        <SkillItem icon={<SiTailwindcss />} name="Tailwind" />
                        <SkillItem icon={<SiMui />} name="MUI" />
                    </Section>
                    <Section title="Server">
                        <SkillItem icon={<SiGo />} name="Go + Gin" />
                        <SkillItem icon={<SiNestjs />} name="NestJS" />
                        <SkillItem icon={<span className="text-lg">🔥</span>} name="Hono" />
                    </Section>
                    <Section title="OS" isLast>
                        <SkillItem icon={<SiArchlinux />} name="Arch Linux" />
                        <SkillItem icon={<SiNixos />} name="NixOS" />
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
            <div className="grid grid-cols-3 gap-2 md:grid-cols-5">{children}</div>
        </div>
    );
}

function SkillItem({ icon, name }: { icon: ReactNode; name: string }) {
    return (
        <div className="flex flex-col items-center border border-base-content p-2">
            <span className="text-2xl">{icon}</span>
            <span className="text-xs">{name}</span>
        </div>
    );
}
