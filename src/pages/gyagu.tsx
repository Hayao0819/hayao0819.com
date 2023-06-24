import { H2 } from "@/components/Headlines";
import GyaguList from "@/components/GyaguList";

export default function GyaguPage() {
    return (
        <>
            <H2>ギャグ</H2>
            <p className="my-5">ギャグを貼ってくれている方へ: 技術的に自動リダイレクトができなかったので、リンクをこのページに変更してくださると助かります。</p>
            <GyaguList />
        </>
    );
}
