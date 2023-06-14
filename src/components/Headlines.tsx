//import { ReactElement } from "react";

interface Props {
    title: string;
}

export function H1({ title }: Props) {
    return <h1 className="text-4xl">{title}</h1>;
}

export function H2({ title }: Props) {
    return <h2 className="text-2xl">{title}</h2>;
}
