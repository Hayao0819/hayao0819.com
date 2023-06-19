import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
//import { ReactNode } from "react";

interface ItemProp {
    link: string;
    children: string;
    icon?: IconDefinition;
}

export function Item({ link, children, icon }: ItemProp) {
    return (
        <div className="select-none">
            <Link href={link} className="m-4 flex items-center rounded-lg px-4  py-2 text-sm hover:bg-gray-700">
                {icon != undefined ? <FontAwesomeIcon icon={icon}></FontAwesomeIcon> : <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>}
                {children}
            </Link>
        </div>
    );
}
