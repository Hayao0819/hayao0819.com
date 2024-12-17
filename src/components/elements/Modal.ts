import { PrimitiveAtom, useAtom } from "jotai";

export type DetailModal<T> = [data: T, setData: (data: T) => void];

export const useDetailModal = <T>(atom: PrimitiveAtom<T>): DetailModal<T> => {
    const [internalData, setInternalData] = useAtom<T>(atom);
    const setData = (data: T): void => setInternalData(data);
    return [internalData, setData];
};

export type SimpleModal = [isOpen: boolean, setOpen: (open: boolean) => void, toggle: () => void];
export const useSimpleModal = (atom: PrimitiveAtom<boolean>): SimpleModal => {
    const [isOpen, setOpen] = useDetailModal(atom);
    return [isOpen, setOpen, (): void => setOpen(!isOpen)];
};
