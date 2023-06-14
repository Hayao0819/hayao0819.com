import Link from "next/link";

interface ItemProp {
    link: string;
    children: string;
}

export function Item({ link, children }: ItemProp) {
    return (
        <div className="select-none">
            <Link href={link} className="m-4 flex items-center rounded-lg px-4  py-2 text-sm hover:bg-gray-700">
                {children}
            </Link>
        </div>
    );
}
