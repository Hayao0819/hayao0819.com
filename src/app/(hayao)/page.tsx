import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { fetchedBlogPostListWithoutHidden as postlist } from "@/lib/blog/post";
import * as utils from "@/lib/utils";

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
    const recentPosts = postlist.getPosts().slice(0, 8);

    return (
        <div>
            {/* Intro */}
            <section>
                <PromptLine>whoami</PromptLine>
                <h1 className="font-body-prose text-foreground mt-4 text-3xl leading-tight tracking-tight md:text-4xl">
                    山田ハヤオ
                </h1>
                <p className="text-foreground/70 mt-3 text-[12px] tracking-[0.14em]">Web Developer / Security Enthusiast</p>
                <p className="font-body-prose text-foreground/90 mt-7 max-w-[46rem] text-[17px] leading-[1.9]">
                    パソコンが好きな大学生。Webやセキュリティに興味があります。
                    主にLinuxやWebフロントエンドをメインに活動しています。
                </p>
                <div className="mt-7 flex items-center gap-5 text-[14px]">
                    <Link
                        href="https://twitter.com/Hayao0819"
                        aria-label="Twitter"
                        className="text-foreground/70 hover:text-foreground -m-2.5 inline-flex p-2.5"
                    >
                        <FaTwitter />
                    </Link>
                    <Link
                        href="https://github.com/Hayao0819"
                        aria-label="GitHub"
                        className="text-foreground/70 hover:text-foreground -m-2.5 inline-flex p-2.5"
                    >
                        <FaGithub />
                    </Link>
                    <Link
                        href="https://instagram.com/Hayao0819"
                        aria-label="Instagram"
                        className="text-foreground/70 hover:text-foreground -m-2.5 inline-flex p-2.5"
                    >
                        <FaInstagram />
                    </Link>
                </div>
            </section>

            <hr className="hairline my-12" />

            {/* Section links — original labels & descriptions */}
            <section>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    {SECTIONS.map((s) => (
                        <li key={s.href}>
                            <Link href={s.href} className="group flex items-baseline gap-3 py-1">
                                <span className="font-body-prose text-foreground group-hover:text-accent text-[16px] font-medium">
                                    {s.title}
                                </span>
                                <span className="text-foreground/70 text-[12px]">{s.description}</span>
                                <span className="text-foreground/30 group-hover:text-foreground/70 ml-auto" aria-hidden="true">
                                    &rarr;
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <hr className="hairline my-12" />

            {/* Recent posts — date + title list */}
            <section>
                <h2 className="mono-eyebrow">// Recent Posts</h2>
                <ul className="mt-6 flex flex-col gap-1.5">
                    {recentPosts.map((p) => {
                        const d = new Date(p.meta.date || 0);
                        return (
                            <li key={p.file}>
                                <Link
                                    href={`/blog/posts/${p.url}`}
                                    className="group grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-1"
                                >
                                    <span className="text-foreground/65 text-[12px] tabular-nums">
                                        {utils.dateToString(d, "-")}
                                    </span>
                                    <span className="font-body-prose text-foreground/90 group-hover:text-accent break-phrase text-[15px] leading-snug text-pretty">
                                        {p.meta.title}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-7 text-[12px]">
                    <Link
                        href="/blog/1"
                        className="text-foreground/70 hover:text-accent -my-2 inline-flex items-center py-2 tracking-[0.14em]"
                    >
                        View All&nbsp;
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                </p>
            </section>

            <hr className="hairline my-12" />

            {/* Quiet links row */}
            <section>
                <h2 className="mono-eyebrow">// Quick Links</h2>
                <div className="text-foreground/65 mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] tracking-[0.14em]">
                    {QUICK_LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="hover:text-foreground -my-1.5 inline-flex items-center py-1.5"
                        >
                            <span className="text-foreground/45" aria-hidden="true">
                                ./
                            </span>
                            {l.text}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
