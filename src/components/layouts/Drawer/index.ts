import useDrawerAtom from "@/hooks/useDrawerAtom";

export { default } from "./Drawer";
//export { default as Side } from "./DrawerSide";
export { default as DrawerContent } from "./DrawerContent";
export { default as ToggleSwitch } from "./DrawerToggle";

export const useDrawer = (): [boolean, () => void] => {
    //const hoge = useState(false);
    const [open, setOpen] = useDrawerAtom();
    const toggleDrawer = () => setOpen((prev) => !prev);
    return [open, toggleDrawer];
};
