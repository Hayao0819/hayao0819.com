import { H2, H3 } from "@/components/Headlines";
import { ReactNode } from "react";
import { SiC, SiGnubash, SiGo, SiLinux, SiPython, SiTypescript } from "@icons-pack/react-simple-icons";
import Link from "@/components/Link";
import { H4 } from "@/components/Headlines/H4";

export default function SkillPage() {
    return (
        <>
            <H2>Skill</H2>
            <Skills>
                <SkillCard icon={SiLinux} title="Linux">
                    <H4>好きなディストリビューション</H4>
                    <p>Arch Linuxが好きです。Gentoo LinuxはPortageが複雑すぎて挫折しました。</p>
                </SkillCard>

                <SkillCard icon={SiGo} title="Golang">
                    <p>歴は短いんですが結構好きです。</p>
                    <H4>つくったもの</H4>
                    <ul>
                        <li>
                            <Link href="https://github.com/Hayao0819/lico">Hayao0819/lico</Link>
                            <br />
                            ドットファイル管理ツール
                        </li>
                        <li>
                            <Link href="https://github.com/Hayao0819/go-distro">Hayao0819/go-distro</Link>
                            <br />
                            ディストリビューション・OS判定ツール
                        </li>
                    </ul>
                </SkillCard>

                <SkillCard icon={SiGnubash} title="Bash">
                    <p>簡単なコマンドラインツールを書くことができます</p>
                    <H4>つくったもの</H4>
                    <ul>
                        <li>
                            <Link href="https://github.com/Hayao0819/nm-vpngate">Hayao0819/nm-vpngate</Link> NetworkManagerでVPNGateに自動接続できます
                        </li>
                    </ul>
                </SkillCard>

                <SkillCard icon={SiPython} title="Python">
                    <p>癖があって好きではないけど、書かないといけないときもある</p>
                </SkillCard>

                <SkillCard icon={SiTypescript} title="HTML/JavaScript/TypeScript">
                    <p>手書きHTMLばっかり書いていましたが、最近React+Next.jsに入門しました。</p>
                </SkillCard>

                <SkillCard icon={SiC} title="C/C++">
                    <p>
                        現在勉強中です。<b>マジで</b>何も書けません。
                    </p>
                </SkillCard>
            </Skills>
        </>
    );
}

interface SkillProps {
    children: ReactNode;
    title: string;
    icon: any;
}

function Skills({ children }: { children: ReactNode }) {
    return <div className="flex w-full flex-wrap justify-center sm:justify-start">{children}</div>;
}

function SkillCard(props: SkillProps) {
    return (
        <div className="daisy-card m-4 w-full bg-base-100 shadow-xl sm:max-w-md">
            <div className="daisy-card-body p-4">
                <div className="flex">
                    <props.icon />
                    <span className="daisy-card-title ml-2 child:py-0">
                        <H3>{props.title}</H3>
                    </span>
                </div>
                {props.children}
            </div>
        </div>
    );
}
