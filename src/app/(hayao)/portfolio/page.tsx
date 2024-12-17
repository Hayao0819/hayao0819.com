import classNames from "clsx";
import React, { FC, ReactNode } from "react";
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

import { Heading } from "@/components/elements/Heading";
import { Link } from "@/components/elements/Link";
import MyLink from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { genMetaData } from "@/lib/meta";

const PortfolioHeading: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <Heading level={2} className="my-5 w-fit px-5 py-3 text-center text-4xl text-accent">
            {children}
        </Heading>
    );
};

export const metadata = genMetaData({ title: "Portfolio" });

export default function Portfolio() {
    return (
        <CommonSpacer>
            <div>
                <PortfolioHeading>制作物について</PortfolioHeading>
                <p>
                    私は小学生の頃からLinuxが非常に好きだったので、それらに関連するものが多くあります。中学校や高校に在籍していた頃はシェルスクリプトやPython等のスクリプト言語を使うことが多かったです。
                </p>
                <p>
                    大学生になってからはGolangやRust、C++等も書き始め、またプロダクション規模のウェブサイトの開発も行うようになりました。更にいくつかの企業でプロダクションのコードも書き始めました。
                </p>
                <p>最近の個人的な流行は</p>
            </div>
            <div>
                <PortfolioHeading>作ったもの</PortfolioHeading>
                <p className="px-5">
                    <MyLink href="/something">こちら</MyLink>でこれまでに作ったものの一部を掲載しています。
                </p>
            </div>
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
                    <SkillCard
                        icon={<SiReact />}
                        title="React.js"
                        side="left"
                        link={[["https://github.com/Hayao0819/hayao0819.com", "hayao0819.com"]]}
                    >
                        ちょっと複雑だなぁと思いつつもTypeScriptとの相性が非常に良いのでよく使っています。
                    </SkillCard>
                    <SkillCard
                        icon={<SiVuedotjs />}
                        title="Vue.js"
                        side="left"
                        link={[["https://www.spotwork.net/", "SpotWORK"]]}
                    >
                        Propsの記号が特徴的でいつも忘れてしまいます。HTMLに近いのでReactよりも書きやすいです。
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

            <div>
                <PortfolioHeading>Network</PortfolioHeading>
                <div className="flex flex-col  gap-5 md:grid md:grid-cols-2">
                    <SkillCard icon={<BsRouter />} title="NEC IX2215" side="left">
                        中古で入手したNECのエンタープライズ向けルーター。自宅サーバのネットワークを管理しています。
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
    link?: [URL | string, string][];
}
function SkillCard(props: SkillCardProps) {
    const side = props.side ?? "left";

    return (
        <div
            className={classNames("flex w-full border-y ", {
                "flex-row-reverse": side === "right",
            })}
        >
            <div className=" flex w-1/2 flex-col  px-10 py-12">
                <div className="flex items-center justify-center child:px-2">
                    <span className="text-2xl">{props.icon}</span>
                    <p className="text-2xl">{props.title}</p>
                </div>
                <div className="flex items-center justify-center child:px-2">
                    {props.link && (
                        <ul className="list-none">
                            {props.link.map(([href, text], i) => (
                                <li key={i} className="py-1">
                                    <Link href={href}>{text}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div
                className={classNames("w-1/2  p-6 flex flex-col items-center justify-center", {
                    "text-left": side === "left",
                    "text-right": side === "right",
                })}
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
