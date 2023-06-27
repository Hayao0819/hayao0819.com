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

    const defaultClassList = "m-4 flex items-center rounded-lg px-4  py-2 text-sm !text-white hover:bg-gray-700";
    const router = useRouter()
    const [classState , setClass] = useState(defaultClassList)
    useEffect(()=>{
        if (removeHashFlag(router.asPath) == link){
            setClass(defaultClassList + " !bg-gray-700");
        }else{
            setClass(defaultClassList)
        }
    })
    

    return (
        <li className="select-none">
            <Link href={link} className={classState}>
                {iconElement}
                <span className="ml-2">{children}</span>
            </Link>
        </li>
    );
}
