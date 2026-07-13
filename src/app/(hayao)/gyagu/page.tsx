import { Link } from "@/components/elements/Link";
import { PageContainer } from "@/components/elements/PageContainer";
import { PageMasthead } from "@/components/elements/PageMasthead";
import GyaguList from "@/features/GyaguList";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "爆笑ギャグページ" });

const FRIEND_SITES = [
    { href: "https://sunset0916.net/gyagu/", label: "サンセット" },
    { href: "https://midra.me/", label: "Midra" },
    { href: "https://lutica.net/gyagu.html", label: "海老瀬るちか" },
    { href: "https://lunachi.me/gyagu/index.html", label: "るなち" },
    { href: "https://l1n4r1.art/gyagu/", label: "L1n4r1Art" },
    { href: "https://cffn.pw/r/gyagu", label: "かふぇいんぱわぁ" },
];

export default function Gyagu() {
    return (
        <PageContainer>
            <PageMasthead title="爆笑ギャグ" />

            <section className="max-w-article pb-14">
                <p className="font-serif-jp mb-6 text-lg font-bold">不足しています。助けてください。</p>
                <GyaguList />
            </section>

            <section className="border-foreground/15 max-w-article border-t py-14">
                <h2 className="font-display text-xl font-bold tracking-tight">ギャグが足りない人へ</h2>
                <p className="text-foreground/75 mt-3 text-sm">友達のサイトもうるサイトwww</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    {FRIEND_SITES.map((s) => (
                        <Link key={s.href} href={s.href} className="text-accent hover:text-foreground transition-colors">
                            {s.label}
                        </Link>
                    ))}
                </div>
            </section>

            <section className="border-foreground/15 max-w-article border-t py-14">
                <h2 className="font-display text-xl font-bold tracking-tight">ギャグが足りている方へ</h2>
                <p className="mt-5 text-sm">
                    <Link href="https://souhait.me/gyagu" className="text-accent hover:text-foreground transition-colors">
                        souhait.net
                    </Link>
                </p>
            </section>

            <section className="border-foreground/15 max-w-article border-t pt-10 text-sm">
                <p>連絡してくれれば載せるかもしれません</p>
                <p className="mt-2">これより下に内容は無いようです。</p>
            </section>
        </PageContainer>
    );
}
