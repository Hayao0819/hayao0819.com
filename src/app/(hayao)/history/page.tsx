import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";

const HISTORY = [
    { href: "https://github.com/Hayao0819/hayao0819.com/tree/old-2023", label: "2023年前半のウェブサイト" },
    { href: "https://old.hayao0819.com/", label: "昔のウェブサイト" },
    { href: "https://old.hayao0819.com/index-r2.html", label: "更に前のトップページ" },
    { href: "https://old.hayao0819.com/index-r1.html", label: "もっと前のトップページ" },
];

export default function History() {
    return (
        <div>
            <header>
                <PromptLine>history</PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight md:text-4xl">History</h1>
                <p className="font-body-prose text-foreground/90 mt-6 max-w-[46rem] text-[17px] leading-[1.9]">
                    過去のハヤオのホームページです
                </p>
            </header>

            <hr className="hairline my-12" />

            {/* shell-history read: numbered lines, newest at the bottom */}
            <ol className="flex flex-col gap-1 text-[13px]">
                {HISTORY.map((h, i) => (
                    <li key={h.href}>
                        <Link
                            href={h.href}
                            className="group text-foreground/80 hover:text-foreground grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-4 py-2.5"
                        >
                            <span className="text-foreground/65 before:bg-accent relative tabular-nums before:pointer-events-none before:absolute before:top-[0.82em] before:left-[-1.1em] before:h-[0.42em] before:w-[0.42em] before:-translate-y-1/2 before:opacity-0 before:transition-opacity before:duration-[120ms] before:content-[''] group-focus-within:before:opacity-100 group-hover:before:opacity-100 motion-reduce:before:transition-none">
                                {HISTORY.length - i}
                            </span>
                            <span className="font-body-prose group-hover:text-accent text-[15px] leading-snug">{h.label}</span>
                            <span className="text-foreground/30 group-hover:text-foreground/70" aria-hidden="true">
                                &rarr;
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}
