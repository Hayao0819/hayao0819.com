import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Events" });

type Ev = {
    title: string;
    event: string;
    date: string;
    location?: string;
    href: string;
};

const CONFERENCE: Ev[] = [
    {
        title: "SCIS 2026",
        event: "暗号と情報セキュリティシンポジウム",
        date: "2026年1月26日〜30日",
        location: "函館アリーナ",
        href: "https://www.iwsec.org/scis/2026/",
    },
    {
        title: "CSS 2025",
        event: "PWS Cup / MWS Cup",
        date: "2025年10月27日〜31日",
        location: "岡山コンベンションセンター",
        href: "https://www.iwsec.org/css/",
    },
    { title: "C2C CTF 2025", event: "Final", date: "2025年", location: "", href: "https://c2c-ctf-2025.org/" },
    {
        title: "CSS 2024",
        event: "MWS Cup",
        date: "2024年10月22日〜25日",
        location: "神戸国際会議場",
        href: "https://www.iwsec.org/css/",
    },
    {
        title: "セキュリティ・キャンプ全国大会",
        event: "開発コース L3ゼミ",
        date: "2024年8月",
        location: "クロス・ウェーブ幕張",
        href: "https://www.ipa.go.jp/jinzai/security-camp/",
    },
];

const INTERNSHIP: Ev[] = [
    {
        title: "NTT R&D Forum 2025",
        event: "研究成果展示",
        date: "2025年11月19日〜21日, 25日〜26日",
        location: "NTT武蔵野研究開発センタ",
        href: "https://www.rd.ntt/forum/2025/",
    },
    {
        title: "さくらインターネット",
        event: "サマーインターン 2025",
        date: "2025年8月",
        location: "さくらインターネット",
        href: "https://www.sakura.ad.jp/recruit/internship/",
    },
    {
        title: "AWS AIプログラミングコンテスト",
        event: "地域創生・社会課題解決 最優秀賞",
        date: "2025年",
        location: "",
        href: "https://aws.amazon.com/jp/government-education/worldwide/japan/nationwide-2025/",
    },
];

const DOUJIN: Ev[] = [
    {
        title: "コミックマーケット 105",
        event: "C105 冬コミ",
        date: "2024年12月29日〜30日",
        location: "東京ビッグサイト",
        href: "https://www.comiket.co.jp/",
    },
    {
        title: "技術書典17",
        event: "技術書オンリーイベント",
        date: "2024年11月3日",
        location: "池袋サンシャインシティ",
        href: "https://techbookfest.org/event/tbf17",
    },
    {
        title: "コミックマーケット 103",
        event: "C103 冬コミ",
        date: "2023年12月30日〜31日",
        location: "東京ビッグサイト",
        href: "https://www.comiket.co.jp/",
    },
    {
        title: "技術書典15",
        event: "技術書オンリーイベント",
        date: "2023年11月12日",
        location: "池袋サンシャインシティ",
        href: "https://techbookfest.org/event/tbf15",
    },
    {
        title: "第20回博麗神社例大祭",
        event: "東方Projectオンリー",
        date: "2023年5月7日",
        location: "東京ビッグサイト",
        href: "https://reitaisai.com/",
    },
    {
        title: "プリズムレコード8",
        event: "まどマギ・マギレコオンリー",
        date: "2022年5月3日",
        location: "川口フレンディア",
        href: "https://prireco.com/",
    },
    {
        title: "第五回博麗神社秋季例大祭",
        event: "東方Projectオンリー",
        date: "2018年10月14日",
        location: "東京ビッグサイト",
        href: "https://reitaisai.com/",
    },
];

function EventList({ items, eyebrow, caption }: { items: Ev[]; eyebrow: string; caption: string }) {
    return (
        <section>
            <p className="mono-eyebrow">{eyebrow}</p>
            <p className="text-foreground/70 mt-1 text-[11.5px]">{caption}</p>
            <ul className="mt-5 flex flex-col gap-1 text-[13px]">
                {items.map((e, i) => (
                    <li key={e.title + i}>
                        <Link
                            href={e.href}
                            className="group text-foreground/85 hover:text-foreground flex flex-col gap-0.5 py-2.5"
                        >
                            <span className="font-body-prose group-hover:text-accent text-[15px] leading-snug">{e.title}</span>
                            <span className="text-foreground/70 text-[11.5px]">
                                {e.event}
                                <span className="text-foreground/25 mx-2" aria-hidden="true">
                                    /
                                </span>
                                <span className="tabular-nums">{e.date}</span>
                                {e.location && (
                                    <>
                                        <span className="text-foreground/25 mx-2" aria-hidden="true">
                                            /
                                        </span>
                                        {e.location}
                                    </>
                                )}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function Events() {
    return (
        <div>
            <header>
                <PromptLine>cat events.md</PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight md:text-4xl">Events</h1>
                <p className="font-body-prose text-foreground/90 mt-6 max-w-[46rem] text-[17px] leading-[1.9]">
                    参加したイベントの記録です。学会・CTF・インターン・同人即売会など様々なイベントに参加しています。
                </p>
            </header>

            <hr className="hairline my-12" />
            <EventList items={CONFERENCE} eyebrow="// Conference" caption="学会・セキュリティイベント" />

            <hr className="hairline my-12" />
            <EventList items={INTERNSHIP} eyebrow={"// Internship & Contest"} caption="インターン・コンテスト" />

            <hr className="hairline my-12" />
            <EventList items={DOUJIN} eyebrow="// Doujin Events" caption="同人即売会" />
        </div>
    );
}
