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

    // Mono Signature: text-only chrome, hairline accent, no chunky boxes.
    // Body h2/h3 carry mono `##`/`###` markers via CSS ([data-prose="body"]).
    const headingTag =
        level == 1 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn, "text-3xl font-medium tracking-tight md:text-4xl")} />
        ) : level == 2 ? (
            <div className="border-foreground/20 mt-14 mb-6 border-b pb-2">
                <Heading {...propsWithoutClassName} className="text-[22px] font-semibold tracking-tight" />
            </div>
        ) : level == 3 ? (
            <div className="mt-10 mb-4">
                <Heading {...propsWithoutClassName} className="text-[18px] font-semibold tracking-tight" />
            </div>
        ) : level == 4 ? (
            <div className="border-foreground/25 mt-8 mb-3 border-l pl-3">
                <Heading {...propsWithoutClassName} className="text-base font-semibold tracking-tight" />
            </div>
        ) : level == 5 ? (
            <Heading {...propsWithoutClassName} className={classNames(cn, "text-sm font-semibold")} />
        ) : (
            <></>
        );

    return headingTag;
}
