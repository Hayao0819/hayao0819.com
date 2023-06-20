
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header(){
    return <><HeaderForSP /></>
}

function HeaderForSP() {
    return (
        <div className="navbar static w-full bg-base-300 sm:hidden">
            <div className="flex-none">
                <label htmlFor="sidebar" className="btn-ghost btn-square btn">
                    <FontAwesomeIcon icon={faBars} size="xl" />
                </label>
            </div>
            <div className="mx-2 flex-1 px-2">Navbar Title</div>
        </div>
    );
}
