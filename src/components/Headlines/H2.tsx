interface H2Props {
    children: string;
}

export function H2({ children }: H2Props) {
    return <h2 className="py-4 text-2xl font-bold underline decoration-4 underline-offset-8">{children}</h2>;
}
