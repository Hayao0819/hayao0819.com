import { useAtom } from "jotai";
import { useContext } from "react";

import { Modal } from "@/components/elements/Modal";
import { modalContext } from "@/components/elements/ModalContext";

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
                        className="daisy-btn-active daisy-btn"
                        onClick={() => {
                            setHistories([]);
                            mtx.closeModal();
                        }}
                    >
                        はい
                    </button>
                    <button className="daisy-btn-active daisy-btn" onClick={mtx.backModal}>
                        いいえ
                    </button>
                </div>
            </Modal>
        </>
    );
}
