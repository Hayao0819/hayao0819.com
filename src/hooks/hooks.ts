import { PrimitiveAtom, useAtom } from "jotai";
import { useCallback } from "react";

//-- Detail Modal
/**
 * データを持つモーダル
 * モーダルを開いた際にデータをセットする
 *
 * @template T モーダルとして保持するデータの型
 */
export type DetailModal<T> = [
    data: T,
    /**
     * モーダルを開き、データをセットする
     * nullをセットするとモーダルを閉じる
     * @param {T} data
     * @returns {void}
     */
    setData: (data: T) => void,
];

export const useDetailModal = <T>(atom: PrimitiveAtom<T>): DetailModal<T> => {
    const [internalData, setInternalData] = useAtom<T>(atom);
    const setData = useCallback((data: T): void => setInternalData(data), [setInternalData]);
    return [internalData, setData];
};

//-- Simple Modal
/**
 * Booleanで開閉するシンプルなモーダル
 */
export type SimpleModal = [isOpen: boolean, setOpen: (open: boolean) => void, toggle: () => void];

/**
 * Booleanで開閉するシンプルなモーダルを作成する
 * @param {boolean} initialOpen
 * @returns {SimpleModal}
 */
export const useSimpleModal = (atom: PrimitiveAtom<boolean>): SimpleModal => {
    const [isOpen, setOpen] = useDetailModal(atom);
    const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
    return [isOpen, setOpen, toggle];
};
