import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, ReactNode, useEffect, useState } from "react";

import { ItemProp } from "./Item";
import { useCurrentURL } from "./util";

interface ItemGroupProp {
    title: string;
    children: ReactElement<ItemProp>[] | ReactElement<ItemProp>;
    //children: ReactNode[];
    icon?: IconDefinition | undefined;
}

export function ItemGroup({ children, icon, title }: ItemGroupProp): ReactNode {
    let iconElement: JSX.Element = <FontAwesomeIcon className="" icon={faCircle} />;
    if (icon != undefined) {
        iconElement = <FontAwesomeIcon className="" icon={icon} />;
    }

    const [isOpened, changeOpen] = useState<boolean | undefined>(undefined);

    let childrenLinks: string[];
    if (children) {
        if (Array.isArray(children)) {
            childrenLinks = children.map((e) => {
                return e.props.link;
            });
        } else {
            childrenLinks = [children.props.link];
        }
    } else {
        childrenLinks = [];
    }

    const currentURL = useCurrentURL(childrenLinks);

    useEffect(() => {
        if (currentURL) {
            changeOpen(true);
        } else {
            changeOpen(undefined);
        }
    }, [currentURL]);

    return (
        <details role="button" open={isOpened}>
            <summary className="m-4 flex items-center rounded-lg !bg-transparent p-4 text-sm before:content-none dark:text-white">
                {iconElement}
                <span className="ml-2 select-none">{title}</span>
            </summary>
            <ul className="child:ml-4">{children}</ul>
        </details>
    );
}
