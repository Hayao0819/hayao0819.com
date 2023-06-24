import { ReactNode } from "react";
import PartyParrot from "./PartyParrot";

export default function GyaguList() {
    return (
        <ul className="list-decimal">
            <Gyagu>良いガタイとは言い難い</Gyagu>
            <Gyagu>エーゲ海のええ外科医</Gyagu>
            <Gyagu>「伊藤何等？」「1等」</Gyagu>
            <Gyagu>みっかでみかん見っかった🍊</Gyagu>
            <Gyagu tweet="インコの淫行">
                インコの淫行
                <PartyParrot />
            </Gyagu>
            <Gyagu>以下活かしたイカ🦑</Gyagu>
            <Gyagu>慶應をKO</Gyagu>
            <Gyagu>apt install アデノシン三リン酸</Gyagu>
            <Gyagu>会場！</Gyagu>
            <Gyagu>
                シンクに向かって<code>rsync</code>
            </Gyagu>
        </ul>
    );
}

function Gyagu({ children, tweet }: { children: ReactNode | string; tweet?: string }) {
    const runTweet = (text: string | undefined) => {
        if (text == undefined) {
            return;
        }
        window.open("https://twitter.com/intent/tweet?text=ハヤオのサイトからギャグ↓" + encodeURIComponent("\n\n" + text), "_blank");
    };

    if (tweet == undefined) {
        if (typeof children == "string") {
            tweet = children;
        }
    }

    return (
        <li
            role="button"
            onClick={() => {
                runTweet(tweet);
            }}
        >
            {children}
        </li>
    );
}

/*
<script>
    // ツイート用リンクを作成
    Array.from(document.getElementById("gyagu-list").children).forEach(e=>{
        // カーソルをポインターに設定
        e.setAttribute("role", "button");

        // クリック時のイベントを設定
        e.addEventListener("click", e=>{
            //window.open("https://twitter.com/intent/tweet?text=ハヤオのサイトからギャグ↓" + encodeURIComponent("\n\n" + e.path[0].innerText), "_blank");
            //console.log(e.path[0].innerText)
            window.open("https://twitter.com/intent/tweet?text=ハヤオのサイトからギャグ↓" + encodeURIComponent("\n\n" + e.composedPath()[0].innerText), "_blank");
            //console.log(e.composedPath()[0].innerText)
        })
    })
</script>
*/
