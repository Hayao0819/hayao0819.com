import { Link } from "@/components/elements/Link";

export default function History() {
    return (
        <div className="m-auto flex w-fit items-start justify-center border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">History</h1>
                <div className="flex flex-col">
                    <p className="border-b-4 border-base-content p-4 text-center">過去のハヤオのホームページです</p>
                    <Link
                        href="https://github.com/Hayao0819/hayao0819.com/tree/old-2023"
                        className="border-b-4 border-base-content p-4 text-center"
                    >
                        2023年前半のウェブサイト
                    </Link>
                    <Link href="https://old.hayao0819.com/" className="border-b-4 border-base-content p-4 text-center">
                        昔のウェブサイト
                    </Link>
                    <Link
                        href="https://old.hayao0819.com/index-r2.html"
                        className="border-b-4 border-base-content p-4 text-center"
                    >
                        更に前のトップページ
                    </Link>
                    <Link href="https://old.hayao0819.com/index-r1.html" className="p-4 text-center">
                        もっと前のトップページ
                    </Link>
                </div>
            </div>
        </div>
    );
}
