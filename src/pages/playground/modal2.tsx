import { useContext } from "react";

import { Modal } from "@/components/elements/NewModal";
import { modalContext, ModalProvider } from "@/components/elements/NewModalContext";

export default function Modal2() {
    const mtx = useContext(modalContext);
    return (
        <ModalProvider>
            <button
                className="daisy-btn"
                onClick={() => {
                    mtx.openModal("example-modal");
                }}
            >
                Open
            </button>
            <Modal name="example-modal">
                <p>Test my modal</p>
            </Modal>
        </ModalProvider>
    );
}
