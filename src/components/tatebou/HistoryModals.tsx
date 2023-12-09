import { useAtom } from "jotai";
import { useContext } from "react";

import { Modal } from "@/components/tatebou/Modal";
import { modalContext } from "@/components/tatebou/ModalContext";

import { historyAtom } from "./History";

export default function HistoryModals() {
    const mtx = useContext(modalContext);
    const [, setHistories] = useAtom(historyAtom);
    return (
        <>
            <Modal name="history-clear-confirm">
                <p>削除してもいい？</p>
                <div className="flex">
                    <button
                        className="btn btn-active"
                        onClick={() => {
                            setHistories([]);
                            mtx.closeModal();
                        }}
                    >
                        はい
                    </button>
                    <button className="btn btn-active" onClick={mtx.backModal}>
                        いいえ
                    </button>
                </div>
            </Modal>
        </>
    );
}
