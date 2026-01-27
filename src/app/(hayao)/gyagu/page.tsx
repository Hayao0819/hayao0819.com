import { Link } from "@/components/elements/Link";
import GyaguList from "@/features/GyaguList";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "爆笑ギャグページ" });

export default function Gyagu() {
    return (
        <div className="border-border m-auto flex w-full max-w-2xl items-start justify-center border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border row-span-4 hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                    爆笑ギャグ
                </h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">爆笑ギャグ</h1>
                <div className="border-border border-b-4 p-4">
                    <p className="mb-2 font-bold">不足しています。助けてください。</p>
                    <GyaguList />
                </div>
                <div className="border-border border-b-4 p-4">
                    <p className="mb-2 font-bold">ギャグが足りない人へ</p>
                    <p className="mb-2 text-sm">友達のサイトもうるサイトwww</p>
                    <div className="flex flex-wrap gap-2">
                        <Link href="https://sunset0916.net/gyagu/" className="underline">
                            サンセット
                        </Link>
                        <Link href="https://midra.me/" className="underline">
                            Midra
                        </Link>
                        <Link href="https://lutica.net/gyagu.html" className="underline">
                            海老瀬るちか
                        </Link>
                        <Link href="https://lunachi.me/gyagu/index.html" className="underline">
                            るなち
                        </Link>
                        <Link href="https://l1n4r1.art/gyagu/" className="underline">
                            L1n4r1Art
                        </Link>
                        <Link href="https://cffn.pw/r/gyagu" className="underline">
                            かふぇいんぱわぁ
                        </Link>
                    </div>
                </div>
                <div className="border-border border-b-4 p-4">
                    <p className="mb-2 font-bold">ギャグが足りている方へ</p>
                    <Link href="https://souhait.me/gyagu" className="underline">
                        souhait.net
                    </Link>
                </div>
                <div className="p-4 text-center text-sm">
                    <p>連絡してくれれば載せるかもしれません</p>
                    <p className="mt-2">これより下に内容は無いようです。</p>
                </div>
            </div>
        </div>
    );
}
