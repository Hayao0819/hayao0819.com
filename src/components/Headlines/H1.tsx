interface H1Props {
    title: string;
}

export function H1({ title }: H1Props) {
    return <h1 className="text-4xl">{title}</h1>;
}
