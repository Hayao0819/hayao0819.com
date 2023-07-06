import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { HeadlineProps } from "./props";

export function H3({ children }: HeadlineProps) {
    return (
        <div className="py-4">
            <FontAwesomeIcon icon={faCaretRight} size="xl" />
            <h3 className="inline pl-2 text-xl">{children}</h3>
        </div>
    );
}
