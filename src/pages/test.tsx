import { H2, H3 } from "@/components/elements/Headlines";
import ThemeButton from "@/components/elements/ThemeBtn";

export default function Test() {
    return (
        <div className="">
            <H2>テスト</H2>
            <p>このページではNextJSの勉強を兼ねた色々な実験をしています。</p>

            <H3>ダークテーマ</H3>
            <p>
                ダークテーマを作ってみたけど現状クソださ→
                <ThemeButton />
            </p>
        </div>
    );
}
