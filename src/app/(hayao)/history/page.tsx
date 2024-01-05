import { Heading } from "@/components/elements/Heading";
import Link from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";

export default function History() {
    return (
        <CommonSpacer>
            <div>
                <Heading level={2}>過去のページ</Heading>
                <p>過去のハヤオのホームページです</p>
                <ul>
                    <li>
                        <Link href="https://old.hayao0819.com/">昔のウェブサイト</Link>
                    </li>
                    <li>
                        <Link href="https://old.hayao0819.com/index-r2.html">更に前のトップページ</Link>
                    </li>
                    <li>
                        <Link href="https://old.hayao0819.com/index-r1.html">もっと前のトップページ</Link>
                    </li>
                </ul>
            </div>
        </CommonSpacer>
    );
}
