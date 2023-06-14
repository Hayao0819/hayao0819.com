import Link from "next/link";

interface ItemProp {
    link: string;
    label: string;
}

export function Item({ link, label }: ItemProp) {
    return (
        <div className="select-none">
            <Link href={link} className="m-4 flex items-center rounded-lg px-4  py-2 text-sm hover:bg-gray-700">
                {label}
            </Link>
        </div>
    );
}
