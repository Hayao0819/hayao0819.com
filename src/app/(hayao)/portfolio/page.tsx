import { Link } from "@/components/elements/Link";
import { PageContainer } from "@/components/elements/PageContainer";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Portfolio & Skills" });

interface EditorialSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

function EditorialSection({ title, description, children }: EditorialSectionProps) {
    return (
        <section className="border-foreground/15 grid grid-cols-1 gap-x-12 gap-y-6 border-t py-12 md:grid-cols-12">
            <div className="md:col-span-3">
                <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
                <p className="text-foreground/75 mt-2 text-xs">{description}</p>
            </div>
            <div className="md:col-span-9">{children}</div>
        </section>
    );
}

function PlainList({ items }: { items: { name: string; note?: string }[] }) {
    return (
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            {items.map((i) => (
                <li key={i.name}>
                    <p className="font-display text-base font-medium">{i.name}</p>
                    {i.note && <p className="text-foreground/70 mt-1 text-xs">{i.note}</p>}
                </li>
            ))}
        </ul>
    );
}

export default function Portfolio() {
    return (
        <PageContainer>
            <PageMasthead
                title="Portfolio"
                lede="小学生の頃からLinuxが好きで、それに関連する制作物が多くあります。 大学生になってからはGolang、Rust、C++等も書き始め、プロダクション規模のウェブ開発も行っています。"
            />

            <section className="-mt-4 mb-12 flex flex-wrap gap-x-8 gap-y-2 text-sm md:-mt-8">
                <Link href="/something" className="text-accent hover:text-foreground transition-colors">
                    その他の制作物一覧 &rarr;
                </Link>
                <Link href="/events" className="text-accent hover:text-foreground transition-colors">
                    イベント参加記録 &rarr;
                </Link>
            </section>

            <EditorialSection title="Skills" description="得意な技術スタック">
                <PlainList
                    items={[
                        { name: "Next.js", note: "main" },
                        { name: "React", note: "main" },
                        { name: "Go", note: "main" },
                        { name: "TypeScript", note: "main" },
                        { name: "Tailwind" },
                        { name: "Vue.js" },
                        { name: "NestJS" },
                        { name: "Shell" },
                    ]}
                />
            </EditorialSection>

            <EditorialSection title="Languages" description="使用言語と制作物">
                <ul className="flex flex-col">
                    {[
                        { name: "Golang", projects: ["lico", "ayaka", "stargazy"] },
                        { name: "TypeScript", projects: ["hayao0819.com", "Minskey"] },
                        { name: "ShellScript", projects: ["nm-vpngate", "Tools"] },
                        { name: "Python", projects: ["archnews"] },
                    ].map((l) => (
                        <li
                            key={l.name}
                            className="border-foreground/10 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t py-4 first:border-t-0"
                        >
                            <p className="font-display w-40 text-base font-medium">{l.name}</p>
                            <p className="text-foreground/75 text-sm">{l.projects.join(" / ")}</p>
                        </li>
                    ))}
                </ul>
            </EditorialSection>

            <EditorialSection title="Frameworks" description="使用フレームワーク">
                <PlainList
                    items={[
                        { name: "React.js" },
                        { name: "Vue.js" },
                        { name: "Next.js" },
                        { name: "NestJS" },
                        { name: "Tailwind" },
                        { name: "MUI" },
                    ]}
                />
            </EditorialSection>

            <EditorialSection title="Environment" description="開発環境">
                <PlainList
                    items={[
                        { name: "Arch Linux" },
                        { name: "NixOS" },
                        { name: "VSCode" },
                        { name: "Docker" },
                        { name: "NEC IX2215" },
                    ]}
                />
            </EditorialSection>

            <div className="border-foreground/15 border-t" aria-hidden />
        </PageContainer>
    );
}
