import { FaArrowRight, FaBlog, FaGithub, FaInstagram, FaTwitter, FaUser, FaUsers } from "react-icons/fa";
import { FaBriefcase, FaLink } from "react-icons/fa6";

import { IconButton } from "@/components/elements/IconButton";
import { Link } from "@/components/elements/Link";
import { NavItem } from "@/components/elements/NavItem";
import { Section } from "@/components/elements/Section";
import { VerticalLabel } from "@/components/elements/VerticalLabel";
import { fetchedBlogPostList as postlist } from "@/lib/blog/post";

export default function Home() {
    const recentPosts = postlist.getPosts().slice(0, 3);

    return (
        <div className="m-auto flex min-h-[calc(100vh-120px)] w-fit items-center justify-center p-4">
            <div className="border-4 border-base-content">
                <div className="grid grid-cols-[auto_1fr] gap-0">
                    <VerticalLabel className="row-span-4 p-3">
                        <h1 className="text-lg font-black tracking-tight">Yamada Hayao</h1>
                    </VerticalLabel>

                    {/* Hero Section */}
                    <Section padding="lg" className="md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
                            <div className="flex-1">
                                <h2 className="text-3xl font-black tracking-tight md:text-4xl">山田ハヤオ</h2>
                                <p className="mt-2 text-sm text-base-content/70 md:text-base">
                                    Web Developer / Security Enthusiast
                                </p>
                                <p className="mt-4 text-sm leading-relaxed text-base-content/80">
                                    パソコンが好きな大学生。Webやセキュリティに興味があります。
                                    主にLinuxやWebフロントエンドをメインに活動しています。
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <IconButton href="https://twitter.com/Hayao0819" icon={<FaTwitter />} label="Twitter" />
                                <IconButton href="https://github.com/Hayao0819" icon={<FaGithub />} label="GitHub" />
                                <IconButton href="https://instagram.com/Hayao0819" icon={<FaInstagram />} label="Instagram" />
                            </div>
                        </div>
                    </Section>

                    {/* Navigation Grid */}
                    <div className="grid border-b-4 border-base-content md:grid-cols-2">
                        <NavItem href="/me" icon={<FaUser />} title="About Me" description="自己紹介" />
                        <NavItem
                            href="/blog/1"
                            icon={<FaBlog />}
                            title="Blog"
                            description="技術記事など"
                            className="border-t-4 border-base-content md:border-l-4 md:border-t-0"
                        />
                        <NavItem
                            href="/portfolio"
                            icon={<FaBriefcase />}
                            title="Portfolio"
                            description="スキル・制作物"
                            className="border-t-4 border-base-content"
                        />
                        <NavItem
                            href="/social"
                            icon={<FaUsers />}
                            title="Social"
                            description="SNS・連絡先"
                            className="border-l-4 border-t-4 border-base-content"
                        />
                    </div>

                    {/* Recent Posts */}
                    <Section padding="lg">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="flex items-center gap-2 font-bold">
                                <FaBlog className="text-base-content/70" />
                                <span>Recent Posts</span>
                            </p>
                            <Link
                                href="/blog/1"
                                className="flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-base-content"
                            >
                                <span>View All</span>
                                <FaArrowRight className="text-xs" />
                            </Link>
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                            {recentPosts.map((post) => (
                                <Link
                                    key={post.file}
                                    href={`/blog/posts/${post.url}`}
                                    className="group block border-2 border-base-content/30 p-4 transition-all hover:border-base-content hover:bg-base-content/5"
                                >
                                    <p className="truncate text-sm font-medium group-hover:underline">{post.meta.title}</p>
                                    <p className="mt-1 text-xs text-base-content/50">{post.meta.category}</p>
                                </Link>
                            ))}
                        </div>
                    </Section>

                    {/* Quick Links */}
                    <Section isLast padding="lg">
                        <div className="flex flex-wrap items-center gap-4">
                            <p className="flex items-center gap-2 text-sm font-bold text-base-content/70">
                                <FaLink />
                                <span>Quick Links:</span>
                            </p>
                            <Link href="/social" className="text-sm hover:underline">
                                Social
                            </Link>
                            <Link href="/history" className="text-sm hover:underline">
                                History
                            </Link>
                            <Link href="/something" className="text-sm hover:underline">
                                Something
                            </Link>
                            <Link href="/events" className="text-sm hover:underline">
                                Events
                            </Link>
                            <Link href="/contact" className="text-sm hover:underline">
                                Contact
                            </Link>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}
