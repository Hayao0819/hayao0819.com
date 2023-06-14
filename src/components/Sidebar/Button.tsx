import { useContext } from "react";
import { sideBarContext } from "@/context/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Button() {
    const { isOpened, setOpened } = useContext(sideBarContext);
    const toggleMenu = () => {
        setOpened(!isOpened);
    };

    return (
        <button type="button" className="m-4 rounded-lg p-2 text-sm" onClick={toggleMenu}>
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
    );
}
