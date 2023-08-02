import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { JSX, ReactNode, useEffect, useState } from "react";

//import { bgColorClass } from "../BaseColor";
import { useCurrentURL } from "./util";
//import { removeHashFlag } from "@/libs/hashflag";

export interface ItemProp {
    link: string;
    children: string;
    icon?: IconDefinition | undefined;
}

export const ItemCommonClass: string[] = ["p-2", "select-none", "my-5", "pl-6"];

export function Item({ link, children, icon }: ItemProp): ReactNode {
    let iconElement: JSX.Element = <FontAwesomeIcon className="" icon={faCircle} />;

    if (icon != undefined) {
        iconElement = <FontAwesomeIcon className="" icon={icon} />;
    }

    const additionalClassList: string[] = [];
    const [classState, setClass] = useState<string[]>(additionalClassList);
    const [isHovered, setHover] = useState(false);
    const isCurrent = useCurrentURL([link]);

    useEffect(() => {
        if (isCurrent || isHovered) {
            //setClass("neumo-sink");
            setClass(["!text-base-100", "!bg-base-content", "rounded-r-full"]);
        } else {
            //setClass("neumo-float");
            setClass([]);
        }
    }, [isHovered, isCurrent]);

    return (
        <li
            className={[...ItemCommonClass, ...classState].join(" ")}
            onMouseOver={() => {
                setHover(true);
            }}
            onMouseOut={() => {
                setHover(false);
            }}
        >
            <Link
                href={link}
                className="flex items-center gap-0 rounded-lg !bg-transparent p-0 text-sm !text-inherit hover:!text-inherit active:!text-inherit "
            >
                {iconElement}
                <span className="ml-2">{children}</span>
            </Link>
        </li>
    );
}
