import { ReactNode, useContext, useEffect, useState } from "react";

import { modalContext } from "./ModalContext";

export function Modal({ children, name }: { children: ReactNode; name: string }) {
    const [modalClass, setModalClass] = useState("");
    const mtx = useContext(modalContext);
    useEffect(() => {
        console.log(mtx.currentModal);
        if (name == mtx.currentModal) {
            setModalClass("daisy-modal-open");
        } else {
            setModalClass("");
        }
    }, [name, mtx.currentModal]);

    return (
        <>
            <dialog className={"daisy-modal " + modalClass}>
                <form method="dialog" className="daisy-modal-box">
                    {children}
                </form>
                <form
                    method="dialog"
                    className="daisy-modal-backdrop"
                    onClick={() => {
                        mtx.openModal("");
                    }}
                >
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
