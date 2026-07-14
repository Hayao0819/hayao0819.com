import { Link } from "@/components/elements/Link";

const LINKS = [
    { href: "/blog/1", text: "Blog" },
    { href: "/portfolio", text: "Portfolio" },
    { href: "/social", text: "Social" },
    { href: "/contact", text: "Contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-foreground/25 border-t bg-background">
            <div className="mx-auto max-w-[60rem] px-6 py-8 md:px-8">
                <p className="font-semibold text-[13px]">Yamada Hayao</p>
                <p className="mt-1 text-[12px] text-foreground/70">パソコンをカタカタ触るのが趣味の底辺大学生</p>
                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 text-[11px] tracking-[0.14em]">
                    <nav className="flex flex-wrap gap-x-5 gap-y-2 text-foreground/70 lowercase">
                        {LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="-my-1.5 inline-flex items-center py-1.5 hover:text-foreground"
                            >
                                <span className="text-foreground/45" aria-hidden="true">
                                    ./
                                </span>
                                {l.text}
                            </Link>
                        ))}
                    </nav>
                    <p className="text-foreground/65">&copy; {year} Yamada Hayao</p>
                </div>
            </div>
        </footer>
    );
}
