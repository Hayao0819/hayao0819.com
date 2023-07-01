import { H2, H3 } from "@/components/Headlines";

import ThemeButton from "@/components/ThemeBtn";

export default function Test() {
    const switchTheme =<input type="button" className="daisy-btn">テーマを切り替える</input>

    return (
        <div className="">
            <H2>テスト</H2>
            <p>このページではNextJSの勉強を兼ねた色々な実験をしています。</p>

            <H3>ダークテーマ</H3>
            <p>ダークテーマを作ってみたけど現状クソださ→<ThemeButton /></p>
            
            
        </div>
    );
}
