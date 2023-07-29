import { createContext, ReactNode, useState } from "react";

type ModalContext = {
    currentModal: string;
    openModal: (modalID: string) => void;
    closeModal: () => void;
};

// global context to share current modal
export const modalContext = createContext<ModalContext>({
    currentModal: "",
    openModal: () => {},
    closeModal: () => {},
});

// custom hook for modalContext
export function useModal(): ModalContext {
    const [currentModal, changeCurrentModal] = useState("");
    const openModal = (name: string) => {
        changeCurrentModal(name);
    };
    const closeModal = () => {
        changeCurrentModal("");
    };
    return {
        currentModal,
        openModal,
        closeModal,
    };
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const mtx = useModal();
    return <modalContext.Provider value={mtx}>{children}</modalContext.Provider>;
};
