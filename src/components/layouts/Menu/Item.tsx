import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { JSX, ReactNode, useEffect, useState } from "react";

import { useCurrentURL } from "./util";
//import { removeHashFlag } from "@/libs/hashflag";

export interface ItemProp {
    link: string;
    children: string;
    icon?: IconDefinition | undefined;
}

export function Item({ link, children, icon }: ItemProp): ReactNode {
    let iconElement: JSX.Element = <FontAwesomeIcon className="" icon={faCircle} />;

    if (icon != undefined) {
        iconElement = <FontAwesomeIcon className="" icon={icon} />;
    }

    const additionalClassList = "";
    const [classState, setClass] = useState(additionalClassList);
    const [isHovered, setHover] = useState(false);
    const isCurrent = useCurrentURL([link]);

    useEffect(() => {
        if (isCurrent || isHovered) {
            setClass("neumo-sink");
        } else {
            //setClass("neumo-float");
            setClass("");
        }
    }, [isHovered, isCurrent]);

    return (
        <li className="select-none">
            <Link
                href={link}
                className={
                    "m-4 flex  items-center gap-0 rounded-lg !bg-transparent px-4 py-4 text-sm dark:text-white " + classState
                }
                onMouseOver={() => {
                    setHover(true);
                }}
                onMouseOut={() => {
                    setHover(false);
                }}
            >
                {iconElement}
                <span className="ml-2">{children}</span>
            </Link>
        </li>
    );
}
