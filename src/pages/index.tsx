import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SiGithub, SiInstagram, SiTwitter } from "@icons-pack/react-simple-icons";
import NextLink from "next/link";
//import GyaguList from "@/components/GyaguList";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

/*
import { H2 } from "@/components/elements/Headlines";

import { My } from "@/components/elements/Icons";
import Link from "@/components/elements/Link";
*/
import Title from "@/components/elements/Title";
import Layout from "@/components/layouts/Layout";
import { getHashFlag } from "@/libs/hashflag";

export default function Home():ReactNode {
    const router = useRouter();
    useEffect(() => {
        const checkHashFlag = () => {
            const hashflag = getHashFlag(router.asPath);
            if (hashflag) {
                switch (hashflag.toLowerCase()) {
                    case "gyagu":
                        router.replace("/gyagu");
                }
            }
        };

        if (typeof window == "object") {
            window.addEventListener("hashchange", checkHashFlag);
        }

        checkHashFlag();
    });

    return (
        <Layout>
            <Title title="トップ" />

            <div className="hidden-scrollbar h-full snap-y snap-mandatory overflow-scroll text-center">
                <div className="flex h-full snap-center items-center justify-center">
                    <div className="max-w-md child:m-2">
                        <h1 className="text-5xl font-bold">山田ハヤオ</h1>

                        <div className="flex text-center child:child:mx-auto child:grow">
                            <NextLink href="https://twitter.com/Hayao0819">
                                <SiTwitter />
                            </NextLink>

                            <NextLink href="https://instagram.com/Hayao0819">
                                <SiInstagram />
                            </NextLink>
                            <NextLink href="https://github.com/Hayao0819">
                                <SiGithub />
                            </NextLink>
                        </div>

                        <p className="py-6">カスなおたく</p>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
                <div className="h-full snap-end">いい感じのコンテンツを準備したい</div>
            </div>
        </Layout>
    );
}

/*
                <Card head="好きなコンテンツ">
                    <ul>
                        <li>まちカドまぞく</li>
                        <li>魔法少女まどか☆マギカ</li>
                        <li>原神</li>
                        <li>ハッピーシュガーライフ</li>
                    </ul>
                </Card>

                <Card head="貢献">
                    <ul>
                        <li>Xfce4 Docklike Pluginの日本語化</li>
                        <li>Gnome Desktop Iconの日本語化</li>
                        <li>Vlangに僅かな修正</li>
                    </ul>
                </Card>


                <Card head="目標">
                    <p>今のITでは一部の大企業の独占や寡占が酷く、日本のソフトウェア産業は停滞気味です。</p>
                    <p>
                        OSSでこの状況を打開して、自分やその周辺の生活を自分の技術力で
                        <NextLink href="https://watasuke.net/portfolio/?lang=ja&page_transition=true&animation=true">
                            人間のやることを減らしたい
                        </NextLink>
                        です。
                    </p>
                    <p>個人的な趣味ですが、日本でデスクトップ用途でのLinuxが普及すればいいなと思います。</p>
                </Card>
*/

/*
function BioLine({ head, children }: { head: string; children: ReactNode }) {
    return (
        <tr className="w-full">
            <td className="w-1/2 lg:w-auto">{head + ":"}</td>
            <td className="w-1/2 lg:w-auto">{children}</td>
        </tr>
    );
}

function Cards({ children }: { children: ReactNode }) {
    return <div className="flex w-full flex-wrap">{children}</div>;
}

function Card({ children, head }: { children: ReactNode; head: string }) {
    return (
        <div className="daisy-card grow lg:w-1/2">
            <div className="daisy-card-body p-2">
                <div className="daisy-card-title">
                    <H2>{head}</H2>
                </div>
                {children}
            </div>
        </div>
    );
}
*/
