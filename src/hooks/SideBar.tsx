import { createContext } from "react";

export const sideBarContext = createContext({
    isOpened: false,
    setOpened: (isOpen: boolean) => {},
});
