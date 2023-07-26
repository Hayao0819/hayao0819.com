import { createContext, ReactNode, useEffect, useState } from "react";

type ModalContext = {
    currentModal: string;
    openModal: (modalID: string) => void;
};

// global context to share current modal
export const modalContext = createContext<ModalContext>({
    currentModal: "",
    openModal: () => {},
});

// custom hook for modalContext
export function useModal(): ModalContext {
    const [currentModal, changeCurrentModal] = useState("");
    const openModal = (name: string) => {
        changeCurrentModal(name);
        console.log("Modal opened: " + name);
    };
    return {
        currentModal,
        openModal,
    };
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const mtx = useModal();
    useEffect(() => {
        console.log(mtx.currentModal);
    }, [mtx.currentModal]);
    return <modalContext.Provider value={mtx}>{children}</modalContext.Provider>;
};
