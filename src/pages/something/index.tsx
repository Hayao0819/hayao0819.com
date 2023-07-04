import { H2, H3 } from "@/components/elements/Headlines";
import Link from "@/components/elements/Link";
import Title from "@/components/elements/Title";

export default function Something() {
    return (
        <>
            <Title title="Something" />
            <H2>Something</H2>
            <p>何か。</p>

            <H3>ツール</H3>
            <Link href="/something/lico">Lico</Link>
        </>
    );
}
