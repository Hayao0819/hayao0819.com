import { useContext } from "react";

import { Modal } from "@/components/elements/NewModal";
import { modalContext, ModalProvider } from "@/components/elements/NewModalContext";

export default function Modal1() {
    return (
        <ModalProvider>
            <Content />
        </ModalProvider>
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
                <p>Test my moda</p>
            </Modal>
        </>
    );
}
