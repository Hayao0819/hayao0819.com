import { H2, H3 } from "@/components/Headlines";
import { My } from "@/components/Icons";
import { ReactNode } from "react";
//import Head from "next/head";
//import Title from "@/components/Title";

export default function Home() {
    return (
        <>
            {/*<Title title="トップ" />*/}
            <Cards>
                <Card head="Bio">
                    <div className="flex flex-col justify-center lg:flex-row lg:justify-normal">
                        <div className="text-center lg:text-left">
                            <My />
                        </div>

                        <table className="text-center lg:m-4 lg:text-left">
                            <tbody>
                                <BioLine head="名前:" text="山田ハヤオ" />
                                <BioLine head="趣味:" text="自作PC・開発・アニメ鑑賞" />
                                <BioLine head="所属:" text="Fascode Network" />
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card head="目標">
                    <p>OSSで世界のシステムが少しでも安定すればいいなと思っています。</p>
                    <p>日本でデスクトップ用途でのLinuxが普及すればいいなと思います。</p>
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

                <Card head="環境">
                    <H3>メインPC-1</H3>
                    <PCEnvTable
                        spec={[
                            { key: "MB", value: "X670E Steel Legend" },
                            { key: "CPU", value: "Ryzen 9 7900X 4.7Ghz 12C24T" },
                            { key: "GPU", value: "AMD Radeon Vega 56" },
                            { key: "RAM", value: "DDR5-5600 16GB x2" },
                            { key: "OS", value: "Arch Linux + Windows 11 Pro" },
                        ]}
                    />
                    <H3>メインPC-2</H3>
                    <p>クズゴミさんありがとうございました。</p>
                    <PCEnvTable
                        spec={[
                            { key: "MB", value: "Z77M-D3H" },
                            { key: "CPU", value: "Intel Xeon E3-1275 3.4Ghz" },
                            { key: "GPU", value: "NVIDIA GTX 960 Ti" },
                            { key: "RAM", value: "DDR3-1666 4GB x4" },
                            { key: "OS", value: "Arch Linux" },
                        ]}
                    />
                </Card>
            </Cards>
        </>
    );
}

function BioLine({ head, text }: { head: string; text: string }) {
    return (
        <tr className="w-full">
            <td className="w-1/2 lg:w-auto">{head}</td>
            <td className="w-1/2 lg:w-auto">{text}</td>
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

interface PCEnvProps {
    spec: {
        key: string;
        value: string;
    }[];
}
function PCEnvTable({ spec }: PCEnvProps) {
    console.log(spec);
    return (
        <table className="daisy-table">
            <tbody>
                {spec.map((line, index) => {
                    console.log(line);
                    return (
                        <tr key={index}>
                            <td className="w-28">{line.key}</td>
                            <td>{line.value}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
