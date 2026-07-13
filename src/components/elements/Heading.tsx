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
    const propsWithoutLevelAndClassName = { ...props, level: undefined, className: undefined };

    const cn = classNames("font-display text-foreground break-phrase scroll-mt-24", props.className);

    const headingTag =
        level == 1 ? (
            <h1 {...propsWithoutLevelAndClassName} className={classNames(cn, "my-6 text-2xl font-black tracking-tight")} />
        ) : level == 2 ? (
            <h2
                {...propsWithoutLevelAndClassName}
                className={classNames(
                    cn,
                    "border-foreground/20 mt-16 mb-8 border-b pb-3 text-xl font-bold tracking-tight md:text-2xl",
                    "after:bg-accent relative after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-12",
                )}
            />
        ) : level == 3 ? (
            <h3 {...propsWithoutLevelAndClassName} className={classNames(cn, "mt-12 mb-4 text-lg font-bold tracking-tight")} />
        ) : level == 4 ? (
            <h4 {...propsWithoutLevelAndClassName} className={classNames(cn, "mt-8 mb-3 text-base font-bold tracking-tight")} />
        ) : level == 5 ? (
            <h5 {...propsWithoutLevelAndClassName} className={classNames(cn, "mt-6 mb-2 text-sm font-bold")} />
        ) : (
            <></>
        );

    return headingTag;
}
