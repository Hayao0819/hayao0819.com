import classNames from "clsx";
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

    const cn = classNames(props.className, "my-6");

    const headingTag =
        level == 1 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn, "text-4xl", "text-center")} />
        ) : level == 2 ? (
            <div className="border-border my-8 border-b-4 pb-2">
                <Heading {...propsWithoutClassName} className="text-xl font-bold" />
            </div>
        ) : level == 3 ? (
            <div className="border-border my-6 border-l-4 pl-3">
                <Heading {...propsWithoutClassName} className="text-lg font-bold" />
            </div>
        ) : level == 4 ? (
            <div className="border-border/50 my-4 border-l-2 pl-3">
                <Heading {...propsWithoutClassName} className="text-base font-bold" />
            </div>
        ) : level == 5 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn, "text-sm font-bold")} />
        ) : (
            <></>
        );

    return headingTag;
}
