import Image from "next/image";

export function My() {
    return (
        <Image src="/icons/top.jpeg" alt="ハヤオのアイコン" width={150} height={150} className="neumo-float m-4 hidden md:inline"></Image>
    );
}
