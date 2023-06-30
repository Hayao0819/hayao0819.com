import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
        <div className="neumo-float-light-shadow dark:neumo-float-dark-shadow daisy-navbar justify-center bg-slate-50  p-4 dark:bg-neutral-600 dark:text-white sm:hidden">
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
