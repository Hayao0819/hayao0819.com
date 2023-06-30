import { H2, H3 } from "@/components/Headlines";
import { ReactNode } from "react";
import { SiC, SiGnubash, SiGo, SiLinux, SiPython, SiTypescript, SiTailwindcss, SiReact, SiNextdotjs, SiVisualstudiocode, SiGitkraken, SiDocker, SiNginx } from "@icons-pack/react-simple-icons";
import Link from "@/components/Link";
import { H4 } from "@/components/Headlines/H4";
import Title from "@/components/Title";
import Image from "next/image";
import { JSX } from "react";

export default function SkillPage() {
    return (
        <>
            <Title title="Skill" />
            <H2>Skill</H2>
            <Skills title="Languages">
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

                <SkillCard icon={<SiGnubash />} title="Bash">
                    <p>簡単なコマンドラインツールを書くことができます</p>
                    <H4>つくったもの</H4>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Link href="https://github.com/Hayao0819/nm-vpngate">Hayao0819/nm-vpngate</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>NetworkManagerでVPNGateに自動接続できます</td>
                            </tr>
                        </tbody>
                    </table>
                </SkillCard>

                <SkillCard icon={<SiPython />} title="Python">
                    <p>癖があって好きではないけど、書かないといけないときもある</p>
                    <p>この苦手さは克服し無いといけないとおもっている。</p>
                    <H4>作ったもの</H4>
                    <p>
                        <Link href="https://github.com/Hayao0819/Hayao-Tools/blob/master/archnews/archnews.py">archnews.py: Arch LinuxのニュースをGUIで表示します</Link>
                    </p>
                </SkillCard>

                <SkillCard icon={<SiTypescript />} title="HTML/JS/TS/(S)CSS">
                    <p>手書きHTMLばっかり書いていましたが、最近React+Next.jsに入門しました。</p>
                </SkillCard>

                <SkillCard icon={<Image src="/icons/vlang.png" width={24} height={24} alt="Vlang" />} title="Vlang">
                    <p>None</p>
                </SkillCard>

                <SkillCard icon={<SiC />} title="C/C++">
                    <p>
                        現在勉強中です。<b>マジで</b>何も書けません。
                    </p>
                </SkillCard>
            </Skills>
            <Skills title="Library /Framework">
                <SkillCard icon={<SiReact />} title="React.js">
                    <p>このウェブサイトで初めて書きました。これから色々勉強していきます。</p>
                </SkillCard>

                <SkillCard icon={<SiNextdotjs />} title="Next.js">
                    <p>このウェブサイトで初めて使いました。ルーティング周りが非常に楽なので今後も使っていきたいです。</p>
                </SkillCard>

                <SkillCard icon={<SiTailwindcss />} title="Tailwind CSS">
                    <p>細かいカスタマイズなどは勉強中です。Reactと組み合わせると最高ですねこれ。</p>
                </SkillCard>
            </Skills>
            <Skills title="Tool">
                <SkillCard icon={<SiLinux />} title="Linux">
                    <H4>好きなディストリビューション</H4>
                    <p>Arch Linuxが好きです。Gentoo LinuxはPortageが複雑すぎて挫折しました。</p>
                </SkillCard>
                <SkillCard icon={<SiVisualstudiocode />} title="VSCode">
                    最強無敵のエディターです。
                </SkillCard>
                <SkillCard icon={<SiGitkraken />} title="GitKraken">
                    Gitの操作は基本的にこれを使っています。視覚的に非常にわかりやすい。
                </SkillCard>
                <SkillCard icon={<SiDocker />} title="Docker">
                    <p>イメージやコンテナの管理がよくわかっていません。すぐにたくさん溜まってしまう。</p>
                    <p>M1なMacBookでもっとお手軽に使えるようになって欲しい。</p>
                </SkillCard>
                <SkillCard icon={<SiNginx />} title="Nginx">
                    んぎっくす
                </SkillCard>
            </Skills>
        </>
    );
}

function Skills({ children, title }: { children: ReactNode; title: string }) {
    return (
        <>
            <div>
                <H3>{title}</H3>
            </div>
            <div className="flex w-full flex-wrap justify-center sm:justify-start">{children}</div>
        </>
    );
}

interface SkillProps {
    children: ReactNode;
    title: string;
    icon: JSX.Element;
}

function SkillCard(props: SkillProps) {
    const Icon = () => {
        return props.icon;
    };

    return (
        <div className="daisy-card m-4 w-full bg-transparent text-sm shadow-lg sm:max-w-sm">
            <div className="daisy-card-body p-4">
                <div className="flex child:min-w-fit">
                    <Icon />
                    <span className="daisy-card-title ml-2 child:py-0">
                        <H3>{props.title}</H3>
                    </span>
                </div>
                {props.children}
            </div>
        </div>
    );
}
