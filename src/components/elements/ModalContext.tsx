import { createContext, useState } from "react";

type ModalContext = {
    currentModal: string;
    openModal: ((modalID: string) => void);
};

export const modalContext = createContext<ModalContext>({
    currentModal: "",
    openModal: ()=>{}
});

export function useModal(): ModalContext {
    const [currentModal, changeCurrentModal] = useState("");
    const openModal=(name: string)=>{
        changeCurrentModal(name)
        console.log("Modal opened: " + currentModal)
    }
    return {
        currentModal,
        openModal,
    };
}


