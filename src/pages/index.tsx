import Hello from "@/components/Hello";
import Layout from "@/components/Layout";
import State from "@/components/State";
import { H2 } from "@/components/Headlines";

export default function Home() {
    return (
        <Layout>
            <H2 title="ホーム" />
            <p>サンセットがいい感じにシンプルなサイトを作ってたので真似してみました。</p>
            <p>自分のサイトって何を書けばいいかやっぱりわからないですね...</p>
            <p>勉強中のぷろぐらま見習い。最近やっと自分のホームページをモダンな感じに更新した。</p>
            <p>もっぱらコンパイル言語全般が使えない情弱なので、基本はすべてシェルスクリプトでゴリゴリ...</p>
            <p>シェルと言ってもゆとり世代なのでBash 5。たまにどうしようもないときにPythonを使う。</p>
            <p>受験が終わって一段落したらC言語とGo言語を触りたいと思っていたりいなかったり。</p>
            <h2>テスト</h2>
            <State></State>
            <Hello></Hello>
        </Layout>
    );
}
