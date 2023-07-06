import React, { JSX } from "react";
import NextLink from "next/link";

export default function Footer(): JSX.Element {
    // スマホで常に下部に固定するいい感じのスタイルを設定したい
    return (
        <footer className="daisy-tooltip flex h-12 w-full items-center justify-center p-2 text-center" data-tip="Thanks to Watasuke , YamaD and Yuri Katsuki">
            <p className="mx-auto block h-6 text-center">
                <NextLink href="/thanks">&copy; 2018-2023 山田ハヤオ</NextLink>
            </p>
        </footer>
    );
}

