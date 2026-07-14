import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "Portfolio & Skills" });

type Skill = { name: string; main?: boolean };

const SKILLS_PRIMARY: Skill[] = [
    { name: "Next.js", main: true },
    { name: "React", main: true },
    { name: "Go", main: true },
    { name: "TypeScript", main: true },
    { name: "Tailwind" },
    { name: "Vue.js" },
    { name: "NestJS" },
    { name: "Shell" },
];

const LANGUAGES = [
    { name: "Golang", projects: ["lico", "ayaka", "stargazy"] },
    { name: "TypeScript", projects: ["hayao0819.com", "Minskey"] },
    { name: "ShellScript", projects: ["nm-vpngate", "Tools"] },
    { name: "Python", projects: ["archnews"] },
];

const FRAMEWORKS: Skill[] = [
    { name: "React.js" },
    { name: "Vue.js" },
    { name: "Next.js" },
    { name: "NestJS" },
    { name: "Tailwind" },
    { name: "MUI" },
];

const ENV: Skill[] = [{ name: "Arch Linux" }, { name: "NixOS" }, { name: "VSCode" }, { name: "Docker" }, { name: "NEC IX2215" }];

function ChipRow({ items }: { items: Skill[] }) {
    return (
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
            {items.map((s) => (
                <li
                    key={s.name}
                    className={`inline-flex items-baseline gap-2 ${s.main ? "text-foreground font-medium" : "text-foreground/65"}`}
                >
                    <span className="text-foreground/30" aria-hidden="true">
                        *
                    </span>
                    <span>{s.name}</span>
                </li>
            ))}
        </ul>
    );
}

export default function Portfolio() {
    return (
        <div>
            <header>
                <PromptLine>cat portfolio.md</PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight md:text-4xl">Portfolio</h1>
                <p className="font-body-prose text-foreground/90 mt-6 max-w-[46rem] text-[17px] leading-[1.9]">
                    小学生の頃からLinuxが好きで、それに関連する制作物が多くあります。
                    大学生になってからはGolang、Rust、C++等も書き始め、プロダクション規模のウェブ開発も行っています。
                </p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                    <Link href="/something" className="link-ai">
                        その他の制作物一覧 &rarr;
                    </Link>
                    <Link href="/events" className="link-ai">
                        イベント参加記録 &rarr;
                    </Link>
                </div>
            </header>

            <hr className="hairline my-12" />

            <section>
                <h2 className="mono-eyebrow">// Skills</h2>
                <p className="text-foreground/70 mt-1 text-[11.5px]">得意な技術スタック</p>
                <ChipRow items={SKILLS_PRIMARY} />
            </section>

            <hr className="hairline my-12" />

            <section>
                <h2 className="mono-eyebrow">// Languages</h2>
                <p className="text-foreground/70 mt-1 text-[11.5px]">使用言語と制作物</p>
                <ul className="mt-5 flex flex-col gap-4 text-[13px]">
                    {LANGUAGES.map((l) => (
                        <li key={l.name} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4">
                            <span className="text-foreground/80">{l.name}</span>
                            <span className="text-foreground/70 flex flex-wrap gap-x-3 gap-y-1">
                                {l.projects.map((p, i) => (
                                    <span key={p}>
                                        {i > 0 && (
                                            <span className="text-foreground/25 mr-3" aria-hidden="true">
                                                /
                                            </span>
                                        )}
                                        {p}
                                    </span>
                                ))}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <hr className="hairline my-12" />

            <section>
                <h2 className="mono-eyebrow">// Frameworks</h2>
                <p className="text-foreground/70 mt-1 text-[11.5px]">使用フレームワーク</p>
                <ChipRow items={FRAMEWORKS} />
            </section>

            <hr className="hairline my-12" />

            <section>
                <h2 className="mono-eyebrow">// Environment</h2>
                <p className="text-foreground/70 mt-1 text-[11.5px]">開発環境</p>
                <ChipRow items={ENV} />
            </section>
        </div>
    );
}
