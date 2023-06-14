import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface H3Props {
    children: string;
}


export function H3({ children }: H3Props) {
    return (
        <div className="py-4">
            <FontAwesomeIcon icon={faCaretRight} size="xl" />
            <h3 className="inline pl-2 text-xl">{children}</h3>
        </div>
    );
}
