import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    level: 1 | 2 | 3 | 4 | 5;
};

export function Heading(props: HeadingProps) {
    const level = props.level;
    const propsWothoutLevelAndClassName = { ...props, level: undefined, className: undefined };
    const cn = classNames("prose", "max-w-full", props.className);

    const headingTag =
        level == 1 ? (
            <h1 {...propsWothoutLevelAndClassName} className={classNames(cn, "prose-2xl")} />
        ) : level == 2 ? (
            <h2 {...propsWothoutLevelAndClassName} className={classNames(cn, "prose-xl")} />
        ) : level == 3 ? (
            <h3 {...propsWothoutLevelAndClassName} className={classNames(cn, "prose-lg")} />
        ) : level == 4 ? (
            <h4 {...propsWothoutLevelAndClassName} className={classNames(cn, "prose-base")} />
        ) : level == 5 ? (
            <h5 {...propsWothoutLevelAndClassName} className={classNames(cn, "prose-sm")} />
        ) : (
            <></>
        );

    return headingTag;
}

export function BlogHeading(props: HeadingProps) {
    const level = props.level;
    const propsWithoutClassName = { ...props, className: undefined };

    const cn = classNames(props.className, "my-4");
    //console.log(cn);

    const headingTag =
        level == 1 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn, "text-4xl", "text-center", "my-8", "tect-accent")} />
        ) : level == 2 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn, "text-accent border-l-2 border-accent pl-2 text-xl")} />
        ) : level == 3 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn, "text-accent")} />
        ) : level == 4 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn)} />
        ) : level == 5 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn)} />
        ) : (
            <></>
        );

    return headingTag;
}
