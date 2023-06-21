import { HeadlineProps } from "./props";

export function H2({ children }: HeadlineProps) {
    return <h2 className="py-4 text-2xl font-bold after:block after:h-1 after:w-8 after:bg-black">{children}</h2>;
}
