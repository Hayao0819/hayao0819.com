import { Link } from "@/components/elements/Link";
import { PageContainer } from "@/components/elements/PageContainer";
import { fetchedBlogPostListWithoutHidden } from "@/lib/blog/post";
import { dateToString, plainSummary } from "@/lib/utils";

const SECTIONS = [
    { href: "/me", title: "About Me", description: "自己紹介" },
    { href: "/blog/1", title: "Blog", description: "技術記事など" },
    { href: "/portfolio", title: "Portfolio", description: "スキル・制作物" },
    { href: "/social", title: "Social", description: "SNS・連絡先" },
];

const QUICK_LINKS = [
    { href: "/social", text: "Social" },
    { href: "/history", text: "History" },
    { href: "/something", text: "Something" },
    { href: "/events", text: "Events" },
    { href: "/contact", text: "Contact" },
];

export default function Home() {
    const recentPosts = fetchedBlogPostListWithoutHidden.getPosts().slice(0, 3);

    return (
        <PageContainer>
            {/* Lead: profile set as the front-page lead story */}
            <section className="mb-16 md:mb-20">
                <p className="tracked-caps text-accent mb-5 text-[11px]">Web Developer / Security Enthusiast</p>
                <h1 className="font-display text-ink text-4xl leading-[1.05] font-black tracking-tight md:text-5xl">
                    山田ハヤオ
                </h1>
                <p className="font-serif-jp text-foreground/80 mt-6 max-w-[38em] text-base leading-[2]">
                    パソコンが好きな大学生。Webやセキュリティに興味があります。
                    主にLinuxやWebフロントエンドをメインに活動しています。
                </p>
                <p className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-sm">
                    <Link href="https://twitter.com/Hayao0819" className="text-accent hover:text-foreground transition-colors">
                        Twitter
                    </Link>
                    <Link href="https://github.com/Hayao0819" className="text-accent hover:text-foreground transition-colors">
                        GitHub
                    </Link>
                    <Link href="https://instagram.com/Hayao0819" className="text-accent hover:text-foreground transition-colors">
                        Instagram
                    </Link>
                </p>
            </section>

            {/* Section directory — four columns, hairlines only where columns meet */}
            <section className="border-foreground/20 border-t pt-8 md:pt-10">
                <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    {SECTIONS.map((s, i) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className={[
                                "group block",
                                i === 0 && "lg:pr-8",
                                i === 1 && "sm:border-foreground/15 sm:border-l sm:pl-8 lg:px-8",
                                i === 2 && "lg:border-foreground/15 lg:border-l lg:px-8",
                                i === 3 && "sm:border-foreground/15 sm:border-l sm:pl-8 lg:px-8",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <h2 className="font-display group-hover:text-accent text-xl font-bold tracking-tight transition-colors">
                                {s.title}
                            </h2>
                            <p className="text-foreground/75 mt-2 text-sm">{s.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recent Posts — three story columns */}
            <section className="mt-16 md:mt-24">
                <div className="border-foreground/20 flex items-baseline justify-between border-t pt-6">
                    <h2 className="font-display text-ink text-xl font-bold tracking-tight md:text-2xl">Recent Posts</h2>
                    <Link href="/blog/1" className="text-accent hover:text-foreground text-sm transition-colors">
                        View All <span aria-hidden>&rarr;</span>
                    </Link>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-10 md:grid-cols-3">
                    {recentPosts.map((post, i) => (
                        <Link
                            key={post.file}
                            href={`/blog/posts/${post.url}`}
                            className={
                                "group block min-w-0" + (i > 0 ? " md:border-foreground/15 md:border-l md:px-8" : " md:pr-8")
                            }
                        >
                            <p className="text-foreground/70 text-xs tabular-nums">
                                {dateToString(new Date(post.meta.date ?? 0), ".")}
                            </p>
                            <h3 className="font-display group-hover:text-accent break-phrase mt-3 text-lg leading-[1.35] font-bold tracking-tight transition-colors">
                                {post.meta.title}
                            </h3>
                            <p className="font-serif-jp text-foreground/75 mt-3 text-sm leading-[1.8]">
                                {plainSummary(post.content, 64)}
                                <span aria-hidden>…</span>
                            </p>
                            <p className="text-accent mt-3 text-xs">{post.meta.category}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Quick Links — folio line */}
            <section className="border-foreground/20 mt-16 border-t pt-6 md:mt-24">
                <p className="flex flex-wrap items-baseline gap-x-7 gap-y-2 text-sm">
                    <span className="tracked-caps text-foreground/70 text-[10px]">Quick Links:</span>
                    {QUICK_LINKS.map((l) => (
                        <Link key={l.href} href={l.href} className="text-foreground/80 hover:text-accent transition-colors">
                            {l.text}
                        </Link>
                    ))}
                </p>
            </section>
        </PageContainer>
    );
}
