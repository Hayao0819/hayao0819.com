import { atom, useAtom } from "jotai";
import React from "react";

import Alert, { useAlert } from "@/components/tatebou/Alert";
import TatebouLayout from "@/components/tatebou/Layout";
import Link from "@/components/tatebou/Link";
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

            <ResetBtn />
        </div>
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

    const SendPOSTToTatebou = async () => {
        const runRequest = async (url: string) => {
            try {
                const res = await fetch("https://1lil.li/p/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ l: url }),
                });

                if (!res.ok) {
                    const text = await res.text();
                    console.log("APIエラー");
                    openAlert(text, "Error");
                    return;
                } else {
                    const text = await res.text();
                    setFetchedData(text);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    openAlert(err.message, "Error");
                }
            }
        };
        /*
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
                        });
                    }
                })
                .catch((err) => {
                    openAlert(err, "Error");
                });
        };
        */

        if (inputURL) {
            const url = formatURL(inputURL);
            setInputURL(url);
            await runRequest(url);
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

                        window.open(fetchedData, "_blank");
                        openAlert("作成されたリンクに移動しました", "Success");
                    }}
                >
                    テスト
                </button>
            </div>
        </div>
    );
}
