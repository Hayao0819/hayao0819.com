import Hello from "@/components/Hello";
import State from "@/components/State";
import { H2, H3 } from "@/components/Headlines";
import Link from "@/components/Link";
import { JSX, useState } from "react";

export default function Detail() {
    return (
        <>
            <div>
                <H2>詳細</H2>
                <p>
                    <Link href="https://sunset0916.net/">サンセット</Link>がいい感じにシンプルなサイトを作ってたので真似してみました。
                </p>
                <p>自分のサイトって何を書けばいいかやっぱりわからないですね...</p>
                <p>勉強中のぷろぐらま見習い。最近やっと自分のホームページをモダンな感じに更新した。</p>
                <p>もっぱらコンパイル言語全般が使えない情弱なので、基本はすべてシェルスクリプトでゴリゴリ...</p>
                <p>シェルと言ってもゆとり世代なのでBash 5。たまにどうしようもないときにPythonを使う。</p>
                <p>受験が終わって一段落したらC言語とGo言語を触りたいと思っていたりいなかったり。</p>

                <H3>自己紹介</H3>
                <p>
                    学生です。 <Link href="https://fascode.net/">Fascode Network</Link>という集団に参加しながらLinuxを勉強中です。
                </p>
                <p>最近はGentoo Linuxに手を出してebuildを四苦八苦しながら書いています。</p>
                <p>使える言語が非常に少なくて実用性がないのが欠点です。これといった専門分野も無いです。</p>
                <p>知らないところに行ったり、空の写真を撮るのが趣味です。</p>
                <p>他にもジャンクPC漁りや自作PC、ガジェット、カスタムROM、Root化など色々やりますがどれも中途半端です。</p>

                <H3>年齢</H3>
                {CalculateMyAge()}

                <H3>身体のこと</H3>
                <p>気管支喘息と不整脈を患っています。気管支喘息は、気管支が狭くなって息が苦しくなる病気(?)です。</p>
                <p>ハヤオとリアルで会ってるときに倒れたら救急車を呼んでください。かばんの中に発作時の吸入器が入ってます。</p>
                <p>他にもアトピー性皮膚炎とか遠視（視力0.2）とか色々と...みんなも健康には気をつけようね。</p>
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

    let age = (function (): number {
        let y = parseInt(year);
        let b = parseInt(born);
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
