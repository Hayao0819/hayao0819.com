import { atom, useAtom } from "jotai";

const drawerAtom = atom(false);

const useDrawerAtom = () => useAtom(drawerAtom);
export default useDrawerAtom;
