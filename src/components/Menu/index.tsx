import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { JSX } from "react";
import { useRouter } from "next/router";

interface ItemProp {
    link: string;
    children: string;
    icon?: IconDefinition | undefined;
}

export function Item({ link, children, icon }: ItemProp): JSX.Element {
    let iconElement: JSX.Element = <FontAwesomeIcon className="" icon={faCircle} />;

    if (icon != undefined) {
        iconElement = <FontAwesomeIcon className="" icon={icon} />;
    }

    let classList = "m-4 flex items-center rounded-lg px-4  py-2 text-sm !text-white hover:bg-gray-700";

    if (useRouter().asPath == link) {
        classList = classList + " bg-gray-700";
    }

    return (
        <li className="select-none">
            <Link href={link} className={classList}>
                {iconElement}
                <span className="ml-2">{children}</span>
            </Link>
        </li>
    );
}
