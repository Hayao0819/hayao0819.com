interface Props {
  title: string;
}

export function H2({ title }: Props) {
  return <h2 className="text-2xl">{title}</h2>;
}
