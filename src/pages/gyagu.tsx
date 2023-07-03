import { H2, H3 } from "@/components/Headlines";
import GyaguList from "@/components/GyaguList";
import Link from "@/components/Link";
import Title from "@/components/Title";

export default function GyaguPage() {
    return (
        <>
            <p>ギャグが不足しています。助けてください。</p>
            <Title title="ギャグ" />
            <H2>ギャグ</H2>

            <div className="pt-2">
                <GyaguList />
            </div>

            <H3>ギャグが足りない人へ</H3>
            <p>友達のサイトもうるサイトwww</p>
            <ul className="list-disc">
                <li>
                    <Link href="https://sunset0916.net/gyagu/">サンセットのウェブサイト</Link>
                </li>
                <li>
                    <Link href="https://midra.me/">Midraのサイト</Link>
                </li>
                <li>
                    <Link href="https://lutica.net/gyagu.html">海老瀬 るちか</Link>
                </li>
                <li>
                    <Link href="https://lunachi.me/gyagu/index.html">るなち</Link>
                </li>
                <li>
                    <Link href="https://l1n4r1.art/gyagu/">L1n4r1Art</Link>
                </li>
                <li>
                    <Link href="https://cffn.pw/r/gyagu">かふぇいんぱわぁ</Link>
                </li>
            </ul>

            <H3>ギャグが足りている方へ</H3>
            <p>
                <Link href="https://souhait.me/gyagu">souhait.net</Link>
            </p>

            <b>連絡してくれれば載せるかもしれません</b>

            <p className="text-center">これより下に内容は無いようです。</p>
        </>
    );
}
