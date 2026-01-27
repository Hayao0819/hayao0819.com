import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

import { Heading } from "./Heading";

export default function PageTitle(
    props: DetailedHTMLProps<PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>, HTMLHeadingElement>,
) {
    const mergedClassName = clsx("text-center", props.className);
    const propsWithoutChildren = { ...props, children: undefined, className: mergedClassName };
    return (
        <div {...propsWithoutChildren}>
            <Heading level={2} className="border-accent text-accent inline-block border-b text-3xl">
                {props.children}
            </Heading>
        </div>
    );
}
