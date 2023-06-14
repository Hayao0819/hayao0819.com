interface H1Props {
    title: string;
}

export function H1({ title }: H1Props) {
    return <h1 className="py-4 text-4xl font-bold">{title}</h1>;
}
