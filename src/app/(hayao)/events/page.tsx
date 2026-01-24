import { FaAws, FaBook, FaBuilding, FaShieldAlt, FaStore, FaTrophy } from "react-icons/fa";
import { GiSunflower } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";

import { ConferenceItem } from "@/components/elements/ConferenceItem";
import { Section } from "@/components/elements/Section";
import { VerticalLabel } from "@/components/elements/VerticalLabel";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Events" });

export default function Events() {
    return (
        <div className="m-auto flex w-fit items-start justify-center p-4">
            <div className="border-4 border-base-content">
                <div className="grid grid-cols-[auto_1fr] gap-0">
                    <VerticalLabel as="h1" className="text-2xl font-black">
                        Events
                    </VerticalLabel>
                    <div className="flex flex-col">
                        {/* Introduction */}
                        <Section>
                            <p className="text-sm leading-relaxed">
                                参加したイベントの記録です。学会・CTF・インターン・同人即売会など様々なイベントに参加しています。
                            </p>
                        </Section>

                        {/* Conference & Security Section */}
                        <Section title="Conference" description="学会・セキュリティイベント">
                            <div className="flex flex-col">
                                <ConferenceItem
                                    icon={<MdSecurity />}
                                    title="SCIS 2026"
                                    event="暗号と情報セキュリティシンポジウム"
                                    date="2026年1月26日〜30日"
                                    location="函館アリーナ"
                                    href="https://www.iwsec.org/scis/2026/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<MdSecurity />}
                                    title="CSS 2025"
                                    event="PWS Cup / MWS Cup"
                                    date="2025年10月27日〜31日"
                                    location="岡山コンベンションセンター"
                                    href="https://www.iwsec.org/css/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaTrophy />}
                                    title="C2C CTF 2025"
                                    event="Final"
                                    date="2025年"
                                    location=""
                                    href="https://c2c-ctf-2025.org/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<MdSecurity />}
                                    title="CSS 2024"
                                    event="MWS Cup"
                                    date="2024年10月22日〜25日"
                                    location="神戸国際会議場"
                                    href="https://www.iwsec.org/css/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaShieldAlt />}
                                    title="セキュリティ・キャンプ全国大会"
                                    event="開発コース L3ゼミ"
                                    date="2024年8月"
                                    location="クロス・ウェーブ幕張"
                                    href="https://www.ipa.go.jp/jinzai/security-camp/"
                                />
                            </div>
                        </Section>

                        {/* Internship & Contest Section */}
                        <Section title="Internship & Contest" description="インターン・コンテスト">
                            <div className="flex flex-col">
                                <ConferenceItem
                                    icon={<FaBuilding />}
                                    title="NTT R&D Forum 2025"
                                    event="研究成果展示"
                                    date="2025年11月19日〜21日, 25日〜26日"
                                    location="NTT武蔵野研究開発センタ"
                                    href="https://www.rd.ntt/forum/2025/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaBuilding />}
                                    title="さくらインターネット"
                                    event="サマーインターン 2025"
                                    date="2025年8月"
                                    location="さくらインターネット"
                                    href="https://www.sakura.ad.jp/recruit/internship/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaAws />}
                                    title="AWS AIプログラミングコンテスト"
                                    event="地域創生・社会課題解決 最優秀賞"
                                    date="2025年"
                                    location=""
                                    href="https://aws.amazon.com/jp/government-education/worldwide/japan/nationwide-2025/"
                                />
                            </div>
                        </Section>

                        {/* Doujin Events Section */}
                        <Section title="Doujin Events" description="同人即売会" isLast>
                            <div className="flex flex-col">
                                <ConferenceItem
                                    icon={<FaStore />}
                                    title="コミックマーケット 105"
                                    event="C105 冬コミ"
                                    date="2024年12月29日〜30日"
                                    location="東京ビッグサイト"
                                    href="https://www.comiket.co.jp/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaBook />}
                                    title="技術書典17"
                                    event="技術書オンリーイベント"
                                    date="2024年11月3日"
                                    location="池袋サンシャインシティ"
                                    href="https://techbookfest.org/event/tbf17"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaStore />}
                                    title="コミックマーケット 103"
                                    event="C103 冬コミ"
                                    date="2023年12月30日〜31日"
                                    location="東京ビッグサイト"
                                    href="https://www.comiket.co.jp/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaBook />}
                                    title="技術書典15"
                                    event="技術書オンリーイベント"
                                    date="2023年11月12日"
                                    location="池袋サンシャインシティ"
                                    href="https://techbookfest.org/event/tbf15"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<GiSunflower />}
                                    title="第20回博麗神社例大祭"
                                    event="東方Projectオンリー"
                                    date="2023年5月7日"
                                    location="東京ビッグサイト"
                                    href="https://reitaisai.com/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<FaStore />}
                                    title="プリズムレコード8"
                                    event="まどマギ・マギレコオンリー"
                                    date="2022年5月3日"
                                    location="川口フレンディア"
                                    href="https://prireco.com/"
                                    className="border-b-2 border-base-content/30"
                                />
                                <ConferenceItem
                                    icon={<GiSunflower />}
                                    title="第五回博麗神社秋季例大祭"
                                    event="東方Projectオンリー"
                                    date="2018年10月14日"
                                    location="東京ビッグサイト"
                                    href="https://reitaisai.com/"
                                />
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}
