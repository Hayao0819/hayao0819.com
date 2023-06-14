// const Footer = (
//   <footer>
//     <p>山田ハヤオ</p>
//   </footer>
// );

// Always use named component export to avoid refreshed loading
import React from "react";

function Footer(): JSX.Element {
    // スマホで常に下部に固定するいい感じのスタイルを設定したい
    return (
        <footer className="text-center">
            <p>山田ハヤオ</p>
        </footer>
    );
}

export default Footer;
