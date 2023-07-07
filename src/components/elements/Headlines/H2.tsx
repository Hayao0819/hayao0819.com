import { HeadlineProps } from "./props";

export function H2({ children }: HeadlineProps) {
    return (
        <h2 className="max-w-fit p-4 text-2xl font-bold after:mx-auto after:block after:h-1 after:w-8 after:bg-slate-800 dark:after:bg-slate-50">
            {children}
        </h2>
    );
}

export function H2Shadow({ children }: HeadlineProps) {
    return (
        <h2 className="neumo-float max-w-fit p-4 text-2xl font-bold after:mx-auto after:block after:h-1 after:w-8 after:bg-slate-800 dark:after:bg-slate-50">
            {children}
        </h2>
    );
}
