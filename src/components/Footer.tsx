import React, { JSX } from "react";

function Footer(): JSX.Element {
    // スマホで常に下部に固定するいい感じのスタイルを設定したい
    return (
        <footer className="flex h-12 w-full items-center justify-center bg-gray-100 text-center">
            <p className="block h-6 text-center">&copy; 2018-2023 山田ハヤオ</p>
        </footer>
    );
}

export default Footer;
