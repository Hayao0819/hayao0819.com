import { H2 } from "../components/elements/Headlines";
import Link from "../components/elements/Link";

export default function History() {
    return (
        <>
            <H2>過去のページ</H2>
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
        </>
    );
}
