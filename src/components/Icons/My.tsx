import Image from "next/image";
import Metadata from "@/const/meta";

export function My() {
    return (
        <div className="text-center">
            <Image src="/icons/top.jpeg" alt="ハヤオのアイコン" width={150} height={150} className="m-4 inline"></Image>
            <h1 className="">{Metadata.title}</h1>
        </div>
    );
}
