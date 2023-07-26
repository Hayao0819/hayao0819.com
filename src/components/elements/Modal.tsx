import { ReactNode, useContext, useEffect, useState } from "react";

import { modalContext } from "./ModalContext";

export function Modal({ children, name, title }: { children: ReactNode; name: string; title?: string }) {
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

    const [titleElement, setTitleElement] = useState<ReactNode>();
    useEffect(() => {
        if (title) {
            setTitleElement(<h3 className="text-lg font-bold">{title}</h3>);
        } else {
            setTitleElement(<></>);
        }
    }, [title]);

    return (
        <>
            <dialog className={"daisy-modal " + modalClass}>
                <form method="dialog" className="daisy-modal-box">
                    {titleElement}
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
