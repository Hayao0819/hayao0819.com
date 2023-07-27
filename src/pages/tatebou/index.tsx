import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { atom, useAtom } from "jotai";
import React, { ReactNode, useContext } from "react";

import Link from "@/components/elements/Link";
import { Modal } from "@/components/elements/Modal";
import { modalContext } from "@/components/elements/ModalContext";
//import { modalContext, useModal } from "@/components/elements/ModalContext";
import TatebouLayout from "@/components/layouts/Tatebou/Layout";

const inputAtom = atom<string>("");
const fetchedAtom = atom<string>("");
const historyAtom = atom<History[]>([]);
const alertAtom = atom<{ className: string; text: string }>({
    className: "hidden",
    text: "",
});

const useAlert = () => {
    const [alertInfo, setAlertInfo] = useAtom(alertAtom);
    const openAlert = (text: string) => {
        setAlertInfo({ text: text, className: "" });
    };
    const closeAlert = () => {
        setAlertInfo({ ...alertInfo, className: "hidden" });
    };
    return { openAlert, closeAlert, alertInfo };
};

export default function Tatebou() {
    return (
        <TatebouLayout>
            <Intro />
            <OriginalURLInput />
            <ActionBtns />
            <Result />
            <TestTools />
            <Alert />
            <TatebouModals />
        </TatebouLayout>
    );
}

type History = {
    date: Date;
    original: string;
    short: string;
};

function Intro() {
    return (
        <div>
            <p>
                迫真縦棒は<Link href="https://yamad.me/">山D</Link>によって提供されている短縮(?)URLサービスです
            </p>
            <p>山Dは最低限のAPIしか作らなかったのでウェブUIを開発しました。</p>
        </div>
    );
}

function OriginalURLInput() {
    const [inputURL, setInputURL] = useAtom(inputAtom);
    return (
        <div>
            <div className="daisy-form-control w-full">
                <label className="daisy-label">
                    <span className="daisy-label-text">元URL</span>
                </label>
                <input
                    type="text"
                    placeholder="短縮するURLを入力して下さい"
                    className="daisy-input-bordered daisy-input w-full"
                    onChange={(e) => {
                        setInputURL(e.target.value);
                    }}
                    value={inputURL}
                />
                <label className="daisy-label">
                    <span className="daisy-label-text-alt">
                        <code className=" text-sm text-pink-600">http</code>から始まるURLを入力して下さい
                    </span>
                </label>
            </div>
        </div>
    );
}

function ActionBtns() {
    const mtx = useContext(modalContext);
    const [, setFetchedData] = useAtom(fetchedAtom);
    const [inputURL, setInputURL] = useAtom(inputAtom);
    const { openAlert } = useAlert();
    const SendPOSTToTatebou = () => {
        const runRequest = (url: string) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `https://1lil.li/p/`, true);
            const send_text = `l=${url}`;
            xhr.onreadystatechange = function () {
                //console.log(xhr.status)
                if (xhr.readyState === 4 && xhr.status === 201) {
                    //output.value = xhr.responseText;
                    setFetchedData(xhr.responseText);
                    //history.add(new Date().toLocaleString(), inputURL, xhr.responseText);
                    appendHistory({
                        original: url,
                        short: xhr.responseText,
                        date: new Date(),
                    });
                    return;
                }

                if (xhr.readyState === 4 && xhr.status === 400) {
                    //this.showAlert("正しいURLを入力してください");
                    console.log("何かがだめみたいです");
                    return;
                }
            };
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(send_text);
        };

        if (inputURL) {
            runRequest(inputURL);
        } else {
            openAlert("URLを入力してください");
        }
    };

    const [currentHistories, SetCurrentHistories] = useAtom(historyAtom);
    const appendHistory = (h: History) => {
        const newArray = [...currentHistories, h];
        SetCurrentHistories(newArray);
        localStorage.setItem("history", JSON.stringify(newArray));
    };

    return (
        <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
            <button className="!daisy-btn-info !daisy-btn-active" onClick={SendPOSTToTatebou}>
                作成
            </button>
            <button className="!daisy-btn-neutral !daisy-btn-active" onClick={() => mtx.openModal("history-modal")}>
                履歴
            </button>
            <button
                className="!daisy-btn-error !daisy-btn-active"
                onClick={() => {
                    setInputURL("");
                }}
            >
                クリア
            </button>
        </div>
    );
}

function Result() {
    const [fetchedData] = useAtom(fetchedAtom);
    return (
        <div className="daisy-form-control w-full">
            <label className="daisy-label">
                <span className="daisy-label-text">結果</span>
            </label>
            <input
                type="text"
                placeholder="結果がここに出力されます"
                value={fetchedData}
                className="daisy-input-bordered daisy-input w-full"
                readOnly
            />
        </div>
    );
}

function Alert(): React.ReactNode {
    const { alertInfo, closeAlert } = useAlert();

    return (
        <div className={"m-2 flex rounded-md bg-red-200 p-2 " + alertInfo.className}>
            <div className="grow">{alertInfo.text}</div>

            <div onClick={closeAlert} role="button" className="mx-2">
                <FontAwesomeIcon icon={faClose} />
            </div>
        </div>
    );
}

function TestTools() {
    const mtx = useContext(modalContext);
    const openNotImplementedModal = () => {
        mtx.openModal("not-implemented");
    };
    return (
        <div>
            <p>結果をテスト</p>
            <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
                <button className="!daisy-btn-primary !daisy-btn-active" onClick={openNotImplementedModal}>
                    コピー
                </button>
                <button className="!daisy-btn-secondary !daisy-btn-active" onClick={openNotImplementedModal}>
                    テスト
                </button>
            </div>
        </div>
    );
}

function TatebouModals() {
    const [currentHistories] = useAtom(historyAtom);
    return (
        <>
            <Modal name="not-implemented" title="未実装">
                <p>ごめんね、まだ実装していないんだ</p>
            </Modal>

            <Modal name="history-modal" title="履歴">
                <HistoryTable histories={currentHistories} />
            </Modal>
        </>
    );
}

function HistoryTable({ histories }: { histories: History[] }): ReactNode {
    return (
        <table>
            <thead className={histories.length == 0 ? "hidden" : ""}>
                <tr>
                    <th>元URL</th>
                    <th>短縮URL</th>
                    <th>作成日時</th>
                </tr>
            </thead>

            <tbody className="">
                {histories.map((h) => {
                    return <HistoryItem history={h} key={h.date.getTime()} />;
                })}
            </tbody>
        </table>
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
            <td>{history.date.toLocaleDateString()}</td>
        </tr>
    );
}
