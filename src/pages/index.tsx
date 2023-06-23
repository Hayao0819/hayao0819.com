import { H2 } from "@/components/Headlines";
import { My } from "@/components/Icons";
import { ReactNode } from "react";
import Link from "@/components/Link";
import Title from "@/components/Title";

export default function Home() {
    return (
        <>
            <Title title="トップ" />
            <Cards>
                <Card head="Bio">
                    <div className="flex flex-col justify-center lg:flex-row lg:justify-normal">
                        <div className="text-center lg:text-left">
                            <My />
                        </div>

                        <table className="text-center lg:m-4 lg:text-left">
                            <tbody>
                                <BioLine head="名前">山田ハヤオ</BioLine>
                                <BioLine head="趣味">自作PC・開発・アニメ鑑賞</BioLine>
                                <BioLine head="所属">Fascode Network</BioLine>
                                <BioLine head="詳細">
                                    <Link href="/detail">こちら</Link>で自分語りしています
                                </BioLine>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card head="目標">
                    <p>今のITでは一部の大企業の独占や寡占が酷く、日本のソフトウェア産業は停滞気味です。</p>
                    <p>OSSでこの状況を打開して、自分やその周辺の生活を自分の技術力で豊かにしたいです。</p>
                    <p>個人的な趣味ですが、日本でデスクトップ用途でのLinuxが普及すればいいなと思います。</p>
                </Card>

                <Card head="経歴">
                    <p>遊んでいます。</p>
                </Card>

                <Card head="好きなコンテンツ">
                    <ul>
                        <li>まちカドまぞく</li>
                        <li>魔法少女まどか☆マギカ</li>
                        <li>原神</li>
                        <li>ハッピーシュガーライフ</li>
                    </ul>
                </Card>
            </Cards>
        </>
    );
}

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
        <div className="daisy-card grow  lg:w-1/2">
            <div className="daisy-card-body p-2">
                <div className="daisy-card-title">
                    <H2>{head}</H2>
                </div>
                {children}
            </div>
        </div>
    );
}
