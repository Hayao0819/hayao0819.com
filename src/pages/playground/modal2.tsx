import { useContext } from "react";

import { Modal } from "@/components/elements/Modal";
import { modalContext } from "@/components/elements/ModalContext";
import TatebouLayout from "@/components/layouts/Tatebou/Layout";

export default function Modal1() {
    return (
        <TatebouLayout>
            <Content />
        </TatebouLayout>
    );
}

function Content() {
    const mtx = useContext(modalContext);
    return (
        <div>
            <button className="daisy-btn" onClick={() => mtx.openModal("example-modal")}>
                Open
            </button>
            <Modal name="example-modal">
                <p>Test my modal</p>
            </Modal>
        </div>
    );
}
