import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import Link from "@/components/elements/Link";

type History = {
    date: string;
    original: string;
    short: string;
};

class Histories {
    list: History[];
    constructor() {
        this.list = [];
    }
    appendHistory = (newHistory: History) => {
        let newArray = [...this.list, newHistory];
        if (
            // 現在の履歴と新しい項目でoriginalが一致する場合
            this.list
                .map<string>((h) => {
                    return h.original;
                })
                .includes(newHistory.original)
        ) {
            // 古い履歴を削除して新しい項目を作成
            newArray = [
                ...newArray.filter((h) => {
                    return h.original != newHistory.original;
                }),
                newHistory,
            ];
        }

        this.list = newArray;
        localStorage.setItem("history", JSON.stringify(newArray));
    };
}

export const historyAtom = atomWithStorage<Histories>("history", new Histories());

export const HistoryTable = () => {
    const [currentHistories] = useAtom(historyAtom);
    if (!currentHistories.list){
        currentHistories.list=[]
    }
    return (
        <table>
            <thead className={(currentHistories.list.length) == 0 ? "hidden" : ""}>
                <tr>
                    <th>元URL</th>
                    <th>短縮URL</th>
                    <th>作成日時</th>
                </tr>
            </thead>

            <tbody className="">
                {currentHistories.list.map((h) => {
                    return <HistoryItem history={h} key={new Date(h.date).getTime()} />;
                })}
            </tbody>
        </table>
    );
};

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
