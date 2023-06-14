import React, { JSX } from "react";

function Footer(): JSX.Element {
    // スマホで常に下部に固定するいい感じのスタイルを設定したい
    return (
        <footer className="w-full text-center sm:static">
            <p>山田ハヤオ</p>
        </footer>
    );
}

export default Footer;
