import { useState } from "react";

import Link from "@/components/elements/Link";
import { Modal } from "@/components/elements/Modal";
import { useModal } from "@/components/elements/ModalContext";
//import { modalContext, useModal } from "@/components/elements/ModalContext";
import TatebouLayout from "@/components/layouts/Tatebou/Layout";

export default function Tatebou() {
    const [fetchedData, setFetchedData] = useState("");
    const [inputURL, setInputURL] = useState("");

    const mtx = useModal();
    const SendPOSTToTatebou = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://1lil.li/p/`, true);
        const send_text = `l=${inputURL}`;
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

    return (
        <TatebouLayout>
            <div>
                <p>
                    迫真縦棒は<Link href="https://yamad.me/">山D</Link>によって提供されている短縮(?)URLサービスです
                </p>
                <p>山Dは最低限のAPIしか作らなかったのでウェブUIを開発しました。</p>
            </div>

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
                <button
                    className="!daisy-btn-neutral !daisy-btn-active"
                    onClick={() => {
                        mtx.openModal("historyModal");
                        console.log(mtx)
                    }}
                >
                    履歴
                </button>
                <button className="!daisy-btn-error !daisy-btn-active">クリア</button>
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

            <Modal name="historyModal">
                <p>テスト</p>
            </Modal>

            <div>
                <p>結果をテスト</p>
                <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
                    <button className="!daisy-btn-primary !daisy-btn-active">コピー</button>
                    <button className="!daisy-btn-secondary !daisy-btn-active">テスト</button>
                </div>
            </div>
        </TatebouLayout>
    );
}
