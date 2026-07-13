import { Link } from "@/components/elements/Link";
import { PageContainer } from "@/components/elements/PageContainer";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Events" });

interface Event {
    title: string;
    event: string;
    date: string;
    location: string;
    href: string;
}

interface EventGroup {
    title: string;
    description: string;
    events: Event[];
}

const GROUPS: EventGroup[] = [
    {
        title: "Conference",
        description: "学会・セキュリティイベント",
        events: [
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
            {
                title: "C2C CTF 2025",
                event: "Final",
                date: "2025年",
                location: "",
                href: "https://c2c-ctf-2025.org/",
            },
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
        ],
    },
    {
        title: "Internship & Contest",
        description: "インターン・コンテスト",
        events: [
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
        ],
    },
    {
        title: "Doujin Events",
        description: "同人即売会",
        events: [
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
        ],
    },
];

export default function Events() {
    return (
        <PageContainer>
            <PageMasthead
                title="Events"
                lede="参加したイベントの記録です。学会・CTF・インターン・同人即売会など様々なイベントに参加しています。"
            />

            {GROUPS.map((g) => (
                <section
                    key={g.title}
                    className="border-foreground/15 grid grid-cols-1 gap-x-12 gap-y-8 border-t py-14 first-of-type:border-t-0 first-of-type:pt-0 md:grid-cols-12"
                >
                    <div className="md:col-span-3">
                        <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">{g.title}</h2>
                        <p className="text-foreground/75 mt-2 text-xs">{g.description}</p>
                    </div>
                    <div className="md:col-span-9">
                        {g.events.map((e) => (
                            <Link key={e.title + e.date} href={e.href} className="group block">
                                <div className="border-foreground/10 flex flex-col gap-x-6 gap-y-1 border-t py-5 first:border-t-0 md:flex-row md:items-baseline">
                                    <span className="text-foreground/70 shrink-0 text-xs tabular-nums md:w-52">{e.date}</span>
                                    <div className="min-w-0 grow">
                                        <p className="font-display group-hover:text-accent text-lg leading-snug font-medium transition-colors">
                                            {e.title}
                                        </p>
                                        <p className="text-foreground/75 mt-1 text-sm">
                                            {e.event}
                                            {e.location && <span className="text-foreground/70"> — {e.location}</span>}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
            <div className="border-foreground/15 border-t" aria-hidden />
        </PageContainer>
    );
}
