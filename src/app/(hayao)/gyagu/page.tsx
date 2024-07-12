import { BlogHeading as Heading } from "@/components/elements/Heading";
import Link from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import GyaguList from "@/features/GyaguList";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "爆笑ギャグページ" });

export default function Gyagu() {
    return (
        <CommonSpacer>
            <div>
                <div>
                    <Heading level={3}>爆笑ギャグページ</Heading>
                    <p>不足しています。助けてください。</p>
                    <div className="">
                        <GyaguList />
                    </div>
                </div>

                <div>
                    <Heading level={3}>ギャグが足りない人へ</Heading>
                    <p>友達のサイトもうるサイトwww</p>
                    <ul className="list-disc pl-10">
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
                </div>

                <Heading level={3}>ギャグが足りている方へ</Heading>
                <p>こちらを御覧ください。</p>
                <ul className="list-disc pl-10">
                    <li>
                        <Link href="https://souhait.me/gyagu">souhait.net</Link>
                    </li>
                </ul>

                <b>連絡してくれれば載せるかもしれません</b>

                <p className="text-center">これより下に内容は無いようです。</p>
            </div>
        </CommonSpacer>
    );
}
