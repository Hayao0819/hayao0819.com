import { createContext, ReactNode, useState } from "react";

type ModalContext = {
    currentModal: string;
    previousModal: string[];
    openModal: (modalID: string) => void;
    closeModal: () => void;
    backModal: () => void;
};

// global context to share current modal
export const modalContext = createContext<ModalContext>({
    currentModal: "",
    previousModal: [],
    openModal: () => {},
    closeModal: () => {},
    backModal: () => {},
});

// custom hook for modalContext
function useModal(): ModalContext {
    const [currentModal, changeCurrentModal] = useState("");
    const [previousModal, changePreviousModal] = useState<string[]>([]);
    const openModal = (name: string) => {
        changePreviousModal([...previousModal, name]);
        changeCurrentModal(name);
    };
    const closeModal = () => {
        changeCurrentModal("");
    };
    const backModal = () => {
        const prev = previousModal[previousModal.length - 2];
        openModal(prev)
    };
    return {
        currentModal,
        previousModal,
        openModal,
        closeModal,
        backModal,
    };
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const mtx = useModal();
    return <modalContext.Provider value={mtx}>{children}</modalContext.Provider>;
};
