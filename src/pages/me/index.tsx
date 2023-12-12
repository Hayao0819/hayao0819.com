import { JSX, useState } from "react";

import { H3 } from "@/components/elements/Headlines";
import Link from "@/components/elements/Link";
import Layout from "@/components/layouts/Layout";

export default function Detail() {
    return (
        <Layout>
            <div>
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
            </div>
        </Layout>
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
