//import { ReactNode } from "react";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    children: string;
}


export function H1({ children }: Props) {
    return <h1 className="py-4 text-4xl font-bold">{children}</h1>;
}

export function H2(props: Props) {
    console.log(props);
    return <h2 className="py-4 text-2xl font-bold underline decoration-4 underline-offset-8">{props.children}</h2>;
}

export function H3({ children }: Props) {
    return (
        <div className="py-4">
            <FontAwesomeIcon icon={faCaretRight} size="xl" />
            <h3 className="inline pl-2 text-xl">{children}</h3>
        </div>
    );
}
