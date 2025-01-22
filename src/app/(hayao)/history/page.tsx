import Link from "@/components/elements/Link";
import PageTitle from "@/components/elements/PageTitle";
import CommonSpacer from "@/components/layouts/CommonSpacer";

export default function History() {
    return (
        <CommonSpacer>
            <PageTitle>History</PageTitle>
            <div>
                <p>過去のハヤオのホームページです</p>
                <ul>
                    <li>
                        <Link href="https://github.com/Hayao0819/hayao0819.com/tree/old-2023">2023年前半のウェブサイト</Link>
                    </li>
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
