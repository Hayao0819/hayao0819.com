import { H2, H3 } from "@/components/elements/Headlines";
import Link from "@/components/elements/Link";
import ThemeButton from "@/components/elements/ThemeBtn";
import Layout from "@/components/layouts/Layout";

export default function Test() {
    return (
        <Layout>
            <H2>砂場</H2>
            <p>このページではNextJSの勉強を兼ねた色々な実験をしています。</p>

            <H3>ダークテーマ</H3>
            <p>
                ダークテーマを作ってみたけど現状クソださ→
                <ThemeButton />
            </p>

            <H3>ブログ</H3>
            <p>
                <Link href="/diary">新しいブログ</Link>をこのサイトのソース内で作ろうとしています。
            </p>
        </Layout>
    );
}
