import { atom, useAtom } from "jotai";
import React, { useContext } from "react";

import Alert, { useAlert } from "@/components/tatebou/Alert";
import { appendHistory, History, historyAtom, HistoryTable } from "@/components/tatebou/History";
import HistoryModals from "@/components/tatebou/HistoryModals";
import TatebouLayout from "@/components/tatebou/Layout";
import Link from "@/components/tatebou/Link";
import { Modal } from "@/components/tatebou/Modal";
import { modalContext } from "@/components/tatebou/ModalContext";
import { formatURL } from "@/lib/tatebou";

const inputAtom = atom<string>("");
const fetchedAtom = atom<string>("");

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
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">元URL</span>
                </label>
                <input
                    type="text"
                    placeholder="短縮するURLを入力して下さい"
                    className="input input-bordered w-full"
                    onChange={(e) => {
                        setInputURL(e.target.value);
                    }}
                    value={inputURL}
                />
                <label className="label">
                    <span className="label-text-alt">
                        <code className=" text-sm text-pink-600">http</code>から始まるURLを入力して下さい
                    </span>
                </label>
            </div>
        </div>
    );
}

function ActionBtns() {
    return (
        <div className="flex gap-2 child:btn child:btn-sm  child:!text-white">
            <CreateBtn />
            <HistoryBtn />
            <ResetBtn />
        </div>
    );
}

function HistoryBtn() {
    const mtx = useContext(modalContext);
    return (
        <button className="!btn-neutral !btn-active" onClick={() => mtx.openModal("history")}>
            履歴
        </button>
    );
}

function ResetBtn() {
    const [, setInputURL] = useAtom(inputAtom);
    return (
        <button
            className="!btn-error !btn-active"
            onClick={() => {
                setInputURL("");
            }}
        >
            クリア
        </button>
    );
}

function CreateBtn() {
    // インプット
    const [, setFetchedData] = useAtom(fetchedAtom);
    const [inputURL, setInputURL] = useAtom(inputAtom);

    // Components
    const { openAlert } = useAlert();

    // 履歴
    const [histories, setHistories] = useAtom(historyAtom);

    const SendPOSTToTatebou = () => {
        const runRequest = (url: string) => {
            fetch("https://1lil.li/p/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ l: url }),
            })
                .then((res) => {
                    if (!res.ok) {
                        res.text().then((text) => {
                            console.log("APIエラー");
                            openAlert(text, "Error");
                        });
                    } else {
                        res.text().then((text) => {
                            setFetchedData(text);
                            const newHistory: History = {
                                original: url,
                                short: text,
                                date: new Date().toISOString(),
                            };
                            setHistories(appendHistory(histories, newHistory));
                        });
                    }
                })
                .catch((err) => {
                    openAlert(err, "Error");
                });
        };

        if (inputURL) {
            const url = formatURL(inputURL);
            setInputURL(url);
            runRequest(url);
        } else {
            openAlert("URLを入力してください");
        }
    };

    return (
        <button className="!btn-info !btn-active" onClick={SendPOSTToTatebou}>
            作成
        </button>
    );
}

function Result() {
    const [fetchedData] = useAtom(fetchedAtom);
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">結果</span>
            </label>
            <input
                type="text"
                placeholder="結果がここに出力されます"
                value={fetchedData}
                className="input input-bordered w-full"
                readOnly
            />
        </div>
    );
}

function TestTools() {
    const mtx = useContext(modalContext);
    /*const openNotImplementedModal = () => {
        mtx.openModal("not-implemented");
    };*/
    const [fetchedData] = useAtom(fetchedAtom);
    const { openAlert } = useAlert();
    const plzMakeURL = () => {
        openAlert("まず短縮URLを作成してください");
    };
    return (
        <div>
            <p>結果をテスト</p>
            <div className="flex gap-2 child:btn child:btn-sm  child:!text-white">
                <button
                    className="!btn-primary !btn-active"
                    onClick={() => {
                        if (!fetchedData) {
                            plzMakeURL();
                            return;
                        }
                        navigator.clipboard.writeText(fetchedData);
                        openAlert("クリップボードにコピーしました", "Success");
                    }}
                >
                    コピー
                </button>
                <button
                    className="!btn-secondary !btn-active"
                    onClick={() => {
                        if (!fetchedData) {
                            plzMakeURL();
                            return;
                        }
                        mtx.openModal("will-move");
                        setTimeout(() => {
                            mtx.closeModal();
                            //router.push(fetchedData)
                            window.open(fetchedData, "_blank");
                            openAlert("作成されたリンクに移動しました", "Success");
                        }, 3000);
                    }}
                >
                    テスト
                </button>
            </div>

            <Modal name="will-move">
                <p>
                    3秒後に<code>{fetchedData}</code>に移動します。
                </p>
            </Modal>
        </div>
    );
}

function TatebouModals() {
    return (
        <>
            <Modal name="not-implemented" title="未実装" backdrop>
                <p>ごめんね、まだ実装していないんだ</p>
            </Modal>

            <Modal name="history" title="履歴">
                <HistoryTable />
            </Modal>

            <HistoryModals />
        </>
    );
}
