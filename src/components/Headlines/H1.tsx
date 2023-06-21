import { HeadlineProps } from "./props";

export function H1({ children }: HeadlineProps) {
    return <h1 className="py-4 text-4xl font-bold">{children}</h1>;
}
