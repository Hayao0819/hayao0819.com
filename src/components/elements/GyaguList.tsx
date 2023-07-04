import { ReactNode } from "react";
import PartyParrot from "./PartyParrot";

export default function GyaguList() {
    return (
        <ul className="list-decimal">
            <Gyagu>院試書かれた印紙。</Gyagu>
            <Gyagu>首位のSyuilo</Gyagu>
            <Gyagu>カニのカニバリズム</Gyagu>
            <Gyagu>カニのカーニバル</Gyagu>
            <div className="daisy-tooltip" data-tip="提供: リア友">
                <Gyagu>つめあつめ</Gyagu>
            </div>
            <Gyagu>良いガタイとは言い難い</Gyagu>
            <Gyagu>エーゲ海のええ外科医</Gyagu>
            <div className="daisy-tooltip" data-tip="提供: 家族">
                <Gyagu>「伊藤何等？」「1等」</Gyagu>
            </div>
            <Gyagu>みっかでみかん見っかった🍊</Gyagu>
            <Gyagu tweet="インコの淫行">
                インコの淫行
                <PartyParrot />
            </Gyagu>
            <Gyagu>以下活かしたイカ🦑</Gyagu>
            <Gyagu>慶應をKO</Gyagu>
            <Gyagu>会場を海上で開場！</Gyagu>
            <Gyagu tweet="シンクに向かってrsync">
                シンクに向かって<code>rsync</code>
            </Gyagu>
        </ul>
    );
}

function Gyagu({ children, tweet }: { children: ReactNode | string; tweet?: string }) {
    const openTweet = (text: string) => {
        window.open("https://twitter.com/intent/tweet?text=ハヤオのサイトからギャグ↓" + encodeURIComponent("\n\n" + text), "_blank");
    };

    if (tweet == undefined) {
        if (typeof children == "string") {
            tweet = children;
        }
    }

    let onClickFunc: ()=>void 
    let gyaguText: string

    if (tweet==undefined){
        onClickFunc=()=>{
            alert("このギャグはツイートできません。ハヤオにエラーを報告してください。")
        }
    }else{
        gyaguText=tweet
        onClickFunc=()=>openTweet(gyaguText)
    }

    return (
        <li role="button" onClick={onClickFunc}>
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
