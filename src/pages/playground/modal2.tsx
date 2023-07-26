import { ReactNode, useContext } from "react";

import { Modal } from "@/components/elements/NewModal";
import { modalContext, useModal } from "@/components/elements/NewModalContext";

export default function Modal2() {
    const mtx = useContext(modalContext);
    return (
        <Layout>
            <button className="daisy-btn" onClick={() => mtx.openModal("example-modal")}>
                Open
            </button>
            <Modal name="example-modal">
                <p>Test my moda</p>
            </Modal>
        </Layout>
    );
}

function Layout({ children }: { children: ReactNode }) {
    const mtx = useModal();
    return <modalContext.Provider value={mtx}>{children}</modalContext.Provider>;
}
