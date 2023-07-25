import { useContext } from "react";

import { Modal } from "@/components/elements/Modal";
import { modalContext, useModal } from "@/components/elements/ModalContext";

export default function Modal1() {
    const mtx = useModal();
    return (
        <modalContext.Provider value={mtx}>
            <Content />
        </modalContext.Provider>
    );
}

function Content() {
    const mtx = useContext(modalContext);
    return (
        <>
            <button className="daisy-btn" onClick={() => mtx.openModal("example-modal")}>
                Open
            </button>
            <Modal name="example-modal">
                <p>Test my modal</p>
            </Modal>
        </>
    );
}
