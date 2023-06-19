interface H2Props {
    children: string;
}

export function H2({ children }: H2Props) {
    return <h2 className="py-4 text-2xl font-bold after:block after:h-1 after:w-8 after:bg-black">{children}</h2>;
}
