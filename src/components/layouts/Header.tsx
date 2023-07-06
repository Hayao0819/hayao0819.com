import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Metadata from "@/const/meta";

export default function Header() {
    return (
        <>
            <HeaderForSP />
        </>
    );
}

function HeaderForSP() {
    return (
        <div className="neumo-float daisy-navbar justify-center p-4 sm:hidden">
            <div className="">
                <label htmlFor="sidebar" className="daisy-btn-ghost daisy-btn-square daisy-btn">
                    <FontAwesomeIcon icon={faBars} size="xl" />
                </label>
            </div>
            <div className="mx-auto">
                <h1 className="px-2 text-center">{Metadata.title}</h1>
            </div>
        </div>
    );
}
