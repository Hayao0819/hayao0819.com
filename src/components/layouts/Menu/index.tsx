import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { removeHashFlag } from "@/libs/hashflag";

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

    const additionalClassList = "";
    const router = useRouter();
    const [classState, setClass] = useState(additionalClassList);
    const [isHovered, setHover] = useState(false);

    useEffect(() => {
        if (removeHashFlag(router.asPath) == link || isHovered) {
            setClass("neumo-sink");
        } else {
            //setClass("neumo-float");
            setClass("");
        }
    }, [link, router.asPath, isHovered]);

    return (
        <li className="select-none">
            <Link
                href={link}
                className={"m-4 flex items-center rounded-lg !bg-transparent px-4 py-4 text-sm dark:text-white " + classState}
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
