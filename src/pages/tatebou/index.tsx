import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import React, { ReactNode, useContext, useEffect, useState } from "react";

import Link from "@/components/elements/Link";
import { Modal } from "@/components/elements/Modal";
import { modalContext } from "@/components/elements/ModalContext";
import TatebouLayout from "@/components/layouts/Tatebou/Layout";

import History from "../history";

const inputAtom = atom<string>("");
const fetchedAtom = atom<string>("");
const historyAtom = atomWithStorage<History[]>("history", []);
const alertAtom = atom<{ isHidden: boolean; text: string; type: AlertType }>({
    isHidden: true,
    text: "",
    type: "None",
});

type AlertType = "Info" | "Success" | "Warn" | "Error" | "None";

const useAlert = () => {
    const [alertInfo, setAlertInfo] = useAtom(alertAtom);
    const openAlert = (text: string, type?: AlertType) => {
        if (type) {
            setAlertInfo({ text: text, isHidden: false, type: type });
        } else {
            setAlertInfo({ text: text, isHidden: false, type: "Error" });
        }
    };
    const closeAlert = () => {
        setAlertInfo({ ...alertInfo, isHidden: true, type: "None" });
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
    return (
        <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
            <CreateBtn />
            <HistoryBtn />
            <ResetBtn />
        </div>
    );
}

function HistoryBtn() {
    const mtx = useContext(modalContext);
    return (
        <button className="!daisy-btn-neutral !daisy-btn-active" onClick={() => mtx.openModal("history-modal")}>
            履歴
        </button>
    );
}

function ResetBtn() {
    const [, setInputURL] = useAtom(inputAtom);
    return (
        <button
            className="!daisy-btn-error !daisy-btn-active"
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
    const [inputURL] = useAtom(inputAtom);

    // Components
    const { openAlert } = useAlert();

    // 履歴
    const [currentHistories, SetCurrentHistories] = useAtom(historyAtom);
    const appendHistory = (newHistory: History) => {
        let newArray = [...currentHistories, newHistory];
        if (
            // 現在の履歴と新しい項目でoriginalが一致する場合
            currentHistories
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

        SetCurrentHistories(newArray);
        localStorage.setItem("history", JSON.stringify(newArray));
    };

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
                            appendHistory({
                                original: url,
                                short: text,
                                date: new Date().toISOString(),
                            });
                        });
                    }
                })
                .catch((err) => {
                    openAlert(err, "Error");
                });
        };

        if (inputURL) {
            runRequest(inputURL);
        } else {
            openAlert("URLを入力してください");
        }
    };

    return (
        <button className="!daisy-btn-info !daisy-btn-active" onClick={SendPOSTToTatebou}>
            作成
        </button>
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
    const [alertClass, setAlertClass] = useState("bg-red-200");
    useEffect(() => {
        if (alertInfo.isHidden) {
            setAlertClass("hidden");
        } else {
            console.log(alertInfo.type);
            switch (alertInfo.type) {
                case "Error":
                    setAlertClass("bg-red-200");
                    break;
                case "Info":
                    setAlertClass("bg-sky-200");
                    break;
                case "Warn":
                    setAlertClass("bg-yellow-200");
                    break;
                case "Success":
                    setAlertClass("bg-green-200");
                    break;
                case "None":
                    setAlertClass("bg-slate-200");
                    break;
            }
        }
    }, [alertInfo.isHidden, alertInfo.type]);
    return (
        <div className={"m-2 flex rounded-md p-2 " + alertClass}>
            <div className="grow">{alertInfo.text}</div>

            <div onClick={closeAlert} role="button" className="mx-2">
                <FontAwesomeIcon icon={faClose} />
            </div>
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
            <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
                <button
                    className="!daisy-btn-primary !daisy-btn-active"
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
                    className="!daisy-btn-secondary !daisy-btn-active"
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
                        }, 3000);
                        openAlert("作成されたリンクに移動しました", "Success");
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
    const [currentHistories] = useAtom(historyAtom);
    return (
        <>
            <Modal name="not-implemented" title="未実装" backdrop>
                <p>ごめんね、まだ実装していないんだ</p>
            </Modal>

            <Modal name="history-modal" title="履歴">
                <HistoryTable histories={currentHistories} />
            </Modal>
        </>
    );
}

type History = {
    date: string;
    original: string;
    short: string;
};

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
                    return <HistoryItem history={h} key={new Date(h.date).getTime()} />;
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
            <td>{new Date(history.date).toLocaleDateString()}</td>
        </tr>
    );
}
