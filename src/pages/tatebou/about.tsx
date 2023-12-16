import { ReactNode } from "react";
import { FaCaretRight } from "react-icons/fa";

import TatebouLayout from "@/components/tatebou/Layout";

export function H3({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center py-4">
            <FaCaretRight className="text-2xl" />
            <h3 className="inline pl-2 text-xl">{children}</h3>
        </div>
    );
}

export default function Usage(): ReactNode {
    return (
        <TatebouLayout>
            <H3>使い方</H3>
            <p>httpもしくはhttpsから始まるURLを縦棒化できます</p>
            <p>上のテキストボックスにURLを入力して作成ボタンを押して下さい</p>

            <H3>バグ報告</H3>
            <p>短縮URLが正常にリダイレクトされない場合は山Dに報告して下さい</p>
            <p>そもそもURLが正常に生成されない場合はハヤオに報告して下さい</p>
            <p>履歴などのフロントエンドの機能もハヤオに報告して下さい</p>
        </TatebouLayout>
    );
}
