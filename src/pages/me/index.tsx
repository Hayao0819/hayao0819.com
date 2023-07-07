import { JSX, useState } from "react";

import { H2, H3 } from "@/components/elements/Headlines";
import Hello from "@/components/elements/Hello";
import Link from "@/components/elements/Link";
import State from "@/components/elements/State";

export default function Detail() {
    return (
        <>
            <div>
                <H2>詳細</H2>
                <p>
                    <Link href="https://sunset0916.net/">サンセット</Link>
                    がいい感じにシンプルなサイトを作ってたので真似してみました。
                </p>
                <p>自分のサイトって何を書けばいいかやっぱりわからないですね...</p>

                <H3>自己紹介</H3>
                <p>
                    某大学の学生です。 <Link href="https://fascode.net/">Fascode Network</Link>
                    という集団に参加しながらLinuxを勉強中です。
                </p>
                <p>
                    知らないところに行ったり、空の写真を撮るのが趣味です。低レイヤーやネットワークに興味がありますが何もわかりません。
                </p>
                <p>Arch Linuxが大好きなのですが、Gentoo LinuxやNixOSに手を出して強くなりたいとおもってます。</p>
                <p>他にもジャンクPC漁りや自作PC、ガジェット、カスタムROM、Root化など色々やります。</p>

                <H3>年齢</H3>
                <CalculateMyAge />

                <H3>身体のこと</H3>
                <p>気管支喘息と不整脈を患っています。気管支喘息は、気管支が狭くなって息が苦しくなる病気(?)です。</p>
                <p>ハヤオとリアルで会ってるときに倒れたら救急車を呼んでください。かばんの中に発作時の吸入器が入ってます。</p>
                <p>他にもアトピー性皮膚炎とか遠視（視力0.2）とか色々と...みんなも健康には気をつけようね。</p>

                <H2>環境</H2>
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
                        { key: "CPU", value: "Intel Xeon E3-1275 3.4Ghz 4C8T" },
                        { key: "GPU", value: "NVIDIA GTX 960 Ti" },
                        { key: "RAM", value: "DDR3-1666 4GB x4" },
                        { key: "OS", value: "Arch Linux" },
                    ]}
                />
                <H3>NAS</H3>
                <PCEnvTable
                    spec={[
                        { key: "Model", value: "Synology DS220+" },
                        { key: "RAM", value: "2GB" },
                        { key: "HDD", value: "WD HDD 8TB x2" },
                    ]}
                />

                <H3>Server</H3>
                <PCEnvTable
                    spec={[
                        { key: "CPU", value: "Xeon E3-1220 3.4Ghz 4C4T" },
                        { key: "RAM", value: "DDR3-1666 4GB x2" },
                        { key: "HDD", value: "4TB + 2TB" },
                        { key: "SSD", value: "128GB" },
                        { key: "OS", value: "Manjaro" },
                    ]}
                />
            </div>

            <div>
                <H2>テスト</H2>
                <State></State>
                <Hello></Hello>
            </div>
        </>
    );
}

function CalculateMyAge(): JSX.Element {
    const currentYear = new Date().getFullYear();
    const [year, changeYear] = useState(currentYear.toString());
    const [born, changeBorn] = useState("2004");

    const age = (function (): number {
        const y = parseInt(year);
        const b = parseInt(born);
        if (isNaN(y) || isNaN(b)) {
            return -1;
        } else {
            return y - b;
        }
    })();

    return (
        <p>
            山田ハヤオ(
            <input
                type="text"
                name="born"
                value={born}
                autoComplete="off"
                className="m-0 w-16 appearance-none border-none p-0 text-center"
                onChange={(e) => {
                    changeBorn(e.target.value);
                }}
            />
            年生まれ)は{" "}
            <input
                type="text"
                name="year"
                value={year}
                autoComplete="off"
                className=" m-0 w-16 appearance-none overflow-hidden border-none p-0 text-center"
                onChange={(e) => {
                    changeYear(e.target.value);
                }}
            />{" "}
            年において
            {age < 0 ? <>まだ生まれていません。</> : <>{age}歳です。</>}
        </p>
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
