import { Link } from "@/components/elements/Link";
import { PageContainer } from "@/components/elements/PageContainer";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "History" });

const ARCHIVES = [
    { label: "2023年前半のウェブサイト", href: "https://github.com/Hayao0819/hayao0819.com/tree/old-2023" },
    { label: "昔のウェブサイト", href: "https://old.hayao0819.com/" },
    { label: "更に前のトップページ", href: "https://old.hayao0819.com/index-r2.html" },
    { label: "もっと前のトップページ", href: "https://old.hayao0819.com/index-r1.html" },
];

export default function History() {
    return (
        <PageContainer>
            <PageMasthead title="History" lede="過去のハヤオのホームページです" />

            <section className="max-w-article">
                {ARCHIVES.map((a) => (
                    <Link key={a.href} href={a.href} className="group block">
                        <div className="border-foreground/10 border-t py-8 first:border-t-0">
                            <span className="font-display group-hover:text-accent text-lg leading-tight font-medium transition-colors md:text-xl">
                                {a.label}
                            </span>
                        </div>
                    </Link>
                ))}
            </section>
        </PageContainer>
    );
}
