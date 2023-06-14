import { createContext } from "react";

export const sideBarContext = createContext({
    isOpened: false,
    // If you want to shut up typescript errors for a while for type errors, use:
    // @ts-ignore.

    // If you want to shut up eslint errors for a while for syntax errors, use:
    // eslint-disable-next-line
    setOpened: (isOpen: boolean) => {},
});
