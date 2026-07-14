import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import GyaguList from "@/features/GyaguList";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "爆笑ギャグページ" });

const FRIENDS = [
    { href: "https://sunset0916.net/gyagu/", label: "サンセット" },
    { href: "https://midra.me/", label: "Midra" },
    { href: "https://lutica.net/gyagu.html", label: "海老瀬るちか" },
    { href: "https://lunachi.me/gyagu/index.html", label: "るなち" },
    { href: "https://l1n4r1.art/gyagu/", label: "L1n4r1Art" },
    { href: "https://cffn.pw/r/gyagu", label: "かふぇいんぱわぁ" },
];

export default function Gyagu() {
    return (
        <div>
            <header>
                <PromptLine>cat gyagu.md</PromptLine>
                <h1 className="mt-4 font-body-prose text-3xl leading-tight tracking-tight md:text-4xl">爆笑ギャグ</h1>
                <p className="mt-4 font-body-prose text-[13px] text-foreground/70">不足しています。助けてください。</p>
            </header>

            <hr className="hairline my-12" />

            <section>
                <div className="font-body-prose text-[16px] text-foreground/90 leading-[1.9]">
                    <GyaguList />
                </div>
            </section>

            <hr className="hairline my-12" />

            <section>
                <p className="font-medium text-foreground">ギャグが足りない人へ</p>
                <p className="mt-1 text-[11.5px] text-foreground/70">友達のサイトもうるサイトwww</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                    {FRIENDS.map((f) => (
                        <li key={f.href}>
                            <Link href={f.href} className="link-ai">
                                {f.label} &rarr;
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <hr className="hairline my-12" />

            <section>
                <p className="font-medium text-foreground">ギャグが足りている方へ</p>
                <p className="mt-5 text-[13px]">
                    <Link href="https://souhait.me/gyagu" className="link-ai">
                        souhait.net &rarr;
                    </Link>
                </p>
            </section>

            <div className="mt-16 text-center text-[12px] text-foreground/65">
                <p>連絡してくれれば載せるかもしれません</p>
                <p className="mt-2">これより下に内容は無いようです。</p>
            </div>
        </div>
    );
}
