import { Link } from "@/components/elements/Link";

export default function History() {
    return (
        <div className="border-border m-auto flex w-full max-w-2xl items-start justify-center border-4">
            <h1 className="border-border hidden self-stretch border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                History
            </h1>
            <div className="flex min-w-0 flex-1 flex-col">
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">History</h1>
                <p className="border-border border-b-4 p-4 text-center">過去のハヤオのホームページです</p>
                <Link
                    href="https://github.com/Hayao0819/hayao0819.com/tree/old-2023"
                    className="border-border border-b-4 p-4 text-center"
                >
                    2023年前半のウェブサイト
                </Link>
                <Link href="https://old.hayao0819.com/" className="border-border border-b-4 p-4 text-center">
                    昔のウェブサイト
                </Link>
                <Link href="https://old.hayao0819.com/index-r2.html" className="border-border border-b-4 p-4 text-center">
                    更に前のトップページ
                </Link>
                <Link href="https://old.hayao0819.com/index-r1.html" className="p-4 text-center">
                    もっと前のトップページ
                </Link>
            </div>
        </div>
    );
}
