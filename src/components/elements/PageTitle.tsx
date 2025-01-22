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
            <Heading level={2} className="inline-block border-b border-accent text-3xl text-accent">
                {props.children}
            </Heading>
        </div>
    );
}
