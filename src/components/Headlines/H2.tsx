interface H2Props {
    title: string;
}

export function H2({ title }: H2Props) {
    return <h2 className="py-4 text-2xl font-bold underline decoration-4 underline-offset-8">{title}</h2>;
}
