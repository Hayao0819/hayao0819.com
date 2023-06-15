import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Button() {
    return (
        <button type="button" className="m-4 rounded-lg p-2 text-sm">
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
    );
}
