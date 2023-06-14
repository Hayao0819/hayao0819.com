interface Props {
    title: string;
}

export function H1({ title }: Props) {
    return <h1 className="text-4xl">{title}</h1>;
}
