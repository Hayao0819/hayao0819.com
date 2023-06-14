interface H1Props {
    children: string;
}

export function H1({ children }: H1Props) {
    return <h1 className="py-4 text-4xl font-bold">{children}</h1>;
}
