import { useState } from "react";

import { Modal } from "@/components/elements/Modal";

// Manage modal without useContext
export default function Modal0() {
    // Todo: use useContext and remove current in Modal
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button className="daisy-btn" onClick={() => setOpenModal(true)}>
                Open
            </button>
            <Modal open={openModal} changeFunc={setOpenModal}>
                <p>Test my moda</p>
            </Modal>
        </>
    );
}
