import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useContext } from "react";

import Link from "@/components/elements/Link";
import { modalContext } from "@/components/elements/ModalContext";

export type History = {
    date: string;
    original: string;
    short: string;
};

// listに新しい履歴を加えた新しい配列を替えします（非破壊）
export function appendHistory(list: History[], add: History): History[] {
    // 参照渡しとか値渡しを理解できていないので、引数のlistを直接書き換えたくない
    // メモリ多く使っちゃうけどとりあえず全部確実に値渡ししておく
    let retList: History[] = [...list];

    // 重複が発生しないようにフィルター
    if (
        // 現在の履歴と新しい項目でoriginalが一致する場合
        retList
            .map<string>((h) => {
                return h.original;
            })
            .includes(add.original)
    ) {
        // 古い履歴を削除して新しい項目を作成
        retList = [
            ...list.filter((h) => {
                return h.original != add.original;
            }),
        ];
    }

    return [...retList, add];
}

export const historyAtom = atomWithStorage<History[]>("history", []);

export const HistoryTable = () => {
    const [currentHistories, setCurrentHistories] = useAtom(historyAtom);
    if (!currentHistories) {
        setCurrentHistories([]);
    }
    return (
        <>
            <table>
                <thead className={currentHistories.length == 0 ? "hidden" : ""}>
                    <tr>
                        <th>元URL</th>
                        <th>短縮URL</th>
                        <th>作成日時</th>
                    </tr>
                </thead>

                <tbody className="">
                    {currentHistories.map((h) => {
                        return <HistoryItem history={h} key={new Date(h.date).getTime()} />;
                    })}
                </tbody>
            </table>
            <div className="">
                {/* 開発途中なので隠す */}
                <div className={currentHistories.length == 0 ? "hidden" : "my-2 flex gap-2 child:daisy-btn-sm"}>
                    <DownloadBtn />
                    <ClearTableBtn />
                </div>
            </div>
        </>
    );
};

function DownloadBtn() {
    return <button className="daisy-btn-active daisy-btn">ダウンロード</button>;
}

function ClearTableBtn() {
    const mtx = useContext(modalContext);
    return (
        <>
            <button
                className="daisy-btn-error daisy-btn-active daisy-btn"
                onClick={() => {
                    mtx.openModal("history-clear-confirm");
                }}
            >
                削除
            </button>
        </>
    );
}

function HistoryItem({ history }: { history: History }) {
    if (!history) return <></>;
    return (
        <tr className="child:px-3">
            <td>
                <Link href={history.original}>{history!.original}</Link>
            </td>
            <td>
                <Link href={history.short}>{history.short}</Link>
            </td>
            <td>{new Date(history.date).toLocaleDateString()}</td>
        </tr>
    );
}
