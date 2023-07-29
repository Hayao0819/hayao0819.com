import { ReactNode, useEffect, useState } from "react";

//import { modalContext } from "./OldModalContext";

export function Modal({
    children,
    open,
    changeFunc,
}: {
    children: ReactNode;
    open: boolean;
    changeFunc: (status: boolean) => void;
}) {
    const [modalClass, setModalClass] = useState("");
    useEffect(() => {
        if (open) {
            setModalClass("daisy-modal-open");
        } else {
            setModalClass("");
        }
    }, [setModalClass, open]);

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
                        changeFunc(false);
                    }}
                >
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
