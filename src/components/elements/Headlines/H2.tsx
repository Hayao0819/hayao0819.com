import { HeadlineProps } from "./props";

export function H2({ children }: HeadlineProps) {
    return (
        <h2 className="max-w-fit p-4 text-3xl font-bold after:mx-auto after:block after:h-1 after:w-12 after:bg-slate-800 dark:after:bg-slate-50">
            {children}
        </h2>
    );
}

export function H2Shadow({ children }: HeadlineProps) {
    return (
        <h2 className="neumo-float max-w-fit p-4 text-3xl font-bold after:mx-auto after:block after:h-1 after:w-12 after:bg-slate-800 dark:after:bg-slate-50">
            {children}
        </h2>
    );
}

/*
export function BlogTitle({ children }: HeadlineProps) {
    return (
        <span className="child:mx-auto">
            <H2>{children}</H2>
        </span>
    );
}
*/
