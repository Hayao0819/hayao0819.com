import { HeadlineProps } from "./props";

export function H2({ children }: HeadlineProps) {
    return <h2 className="py-4 text-2xl font-bold after:block after:h-1 after:w-8 after:bg-slate-800 dark:after:bg-slate-50">{children}</h2>;
}
