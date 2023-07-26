import { useContext, useRef, useState } from "react";

import Link from "@/components/elements/Link";
import { Modal } from "@/components/elements/NewModal";
import { modalContext } from "@/components/elements/NewModalContext";
//import { modalContext, useModal } from "@/components/elements/ModalContext";
import TatebouLayout from "@/components/layouts/Tatebou/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Tatebou() {
    const [fetchedData, setFetchedData] = useState("");
    const [inputURL, setInputURL] = useState("");
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

    const mtx = useContext(modalContext);
    //const inputRef = useRef<HTMLInputElement>(null)

    // アラート
    const [alertClass, setAlertClass] = useState<string>("hidden");
    const [alertText, setAlertText] = useState<string>("");
    const openAlert = (text: string) => {
        setAlertClass("");
        setAlertText(text);
    };
    const closeAlert = () => {
        setAlertClass("hidden");
    };

    // 未実装
    const openNotImplementedModal = ()=>{
        mtx.openModal("not-implemented");
    }

    return (
        <TatebouLayout>
            <Intro />
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

            <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
                <button className="!daisy-btn-info !daisy-btn-active" onClick={SendPOSTToTatebou}>
                    作成
                </button>
                <button className="!daisy-btn-neutral !daisy-btn-active" onClick={() => mtx.openModal("history-modal")}>
                    履歴
                </button>
                <button className="!daisy-btn-error !daisy-btn-active" onClick={()=>{setInputURL("")}}>クリア</button>
            </div>

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

            <div>
                <p>結果をテスト</p>
                <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
                    <button className="!daisy-btn-primary !daisy-btn-active" onClick={openNotImplementedModal}>コピー</button>
                    <button className="!daisy-btn-secondary !daisy-btn-active" onClick={openNotImplementedModal}>テスト</button>
                </div>
            </div>

            {/* アラート */}
            <div className={"flex rounded-md bg-red-200 p-2 m-2 " + alertClass}>
                <div className="grow">{alertText}</div>

                <div onClick={closeAlert} role="button" className="mx-2">
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>

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

function TatebouModals() {
    return (
        <>
            <Modal name="history-modal">
                <p>テスト</p>
            </Modal>

            <Modal name="not-implemented">
                <p>ごめんね、まだ実装していないんだ</p>
            </Modal>
        </>
    );
}
