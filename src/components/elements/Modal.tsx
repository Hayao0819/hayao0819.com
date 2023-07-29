import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useContext, useEffect, useState } from "react";

import { modalContext } from "./ModalContext";

export function Modal({
    children,
    name,
    title,
    backdrop,
}: {
    children: ReactNode;
    name: string;
    title?: string;
    backdrop?: boolean;
}) {
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
                <form method="dialog" className="daisy-modal-box min-w-fit">
                    <div className="flex">
                        <span className="grow">{titleElement}</span>
                        <FontAwesomeIcon icon={faXmark} onClick={mtx.closeModal} role="button" />
                    </div>
                    <div>{children}</div>
                </form>
                <form
                    method="dialog"
                    className="daisy-modal-backdrop"
                    onClick={() => {
                        if (backdrop != false) {
                            mtx.closeModal();
                        }
                    }}
                >
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
