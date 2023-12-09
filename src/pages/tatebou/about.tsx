import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

import TatebouLayout from "@/components/tatebou/Layout";

export function H3({ children }: { children: ReactNode }) {
    return (
        <div className="py-4">
            <FontAwesomeIcon icon={faCaretRight} size="xl" />
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
