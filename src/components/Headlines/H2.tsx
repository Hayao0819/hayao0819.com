interface H2Props {
    title: string;
}

export function H2({ title }: H2Props) {
    return <h2 className="text-2xl">{title}</h2>;
}
