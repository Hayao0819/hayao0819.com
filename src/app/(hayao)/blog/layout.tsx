import { FaFolder, FaGithub, FaLink, FaTags, FaTwitter } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { fetchedBlogPostList as postlist } from "@/lib/blog/post";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const categories = postlist.getAllCategories();
    const tags = postlist.getAllTags();
    const posts = postlist.getPosts().slice(undefined, 10);

    return (
        <div className="m-auto flex w-full max-w-6xl items-start justify-center gap-4 p-4">
            {/* Main Content */}
            <div className="min-w-0 flex-1">{children}</div>

            {/* Sidebar - Secondary, lighter style */}
            <aside className="border-border/60 hidden w-72 shrink-0 overflow-hidden rounded-sm border-2 md:block">
                <div className="flex flex-col">
                    {/* Profile Section - 背景色で区別 */}
                    <div className="bg-foreground/5 p-4">
                        <p className="font-bold">Yamada Hayao</p>
                        <p className="text-foreground/60 mt-1 text-xs leading-relaxed">
                            パソコンが好きな大学生。Webやセキュリティに興味あり。
                        </p>
                        <div className="mt-3 flex gap-2">
                            <Link
                                href="https://twitter.com/Hayao0819"
                                aria-label="Twitter"
                                className="hover:bg-foreground hover:text-background flex items-center justify-center rounded-sm p-2 transition-colors"
                            >
                                <FaTwitter className="text-lg" />
                            </Link>
                            <Link
                                href="https://github.com/Hayao0819"
                                aria-label="GitHub"
                                className="hover:bg-foreground hover:text-background flex items-center justify-center rounded-sm p-2 transition-colors"
                            >
                                <FaGithub className="text-lg" />
                            </Link>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="border-border/30 border-t p-4">
                        <Link
                            href="/blog/category"
                            className="text-foreground/50 mb-3 flex items-center gap-2 text-xs font-bold tracking-wide uppercase"
                        >
                            <FaFolder />
                            <span>Categories</span>
                        </Link>
                        <div className="flex flex-wrap gap-1.5">
                            {categories.map((c) => (
                                <Link
                                    key={c}
                                    href={`/blog/category/${c}`}
                                    className="text-foreground/70 hover:text-foreground text-xs transition-colors hover:underline"
                                >
                                    {c}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="border-border/30 border-t p-4">
                        <Link
                            href="/blog/tag"
                            className="text-foreground/50 mb-3 flex items-center gap-2 text-xs font-bold tracking-wide uppercase"
                        >
                            <FaTags />
                            <span>Tags</span>
                        </Link>
                        <div className="flex flex-wrap gap-1.5">
                            {tags.slice(0, 15).map((c) => (
                                <Link
                                    key={c}
                                    href={`/blog/tag/${c}`}
                                    className="text-foreground/70 hover:text-foreground text-xs transition-colors hover:underline"
                                >
                                    #{c}
                                </Link>
                            ))}
                            {tags.length > 15 && (
                                <Link
                                    href="/blog/tag"
                                    className="text-foreground/70 hover:text-foreground text-xs transition-colors hover:underline"
                                >
                                    +{tags.length - 15} more
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="border-border/30 border-t p-4">
                        <p className="text-foreground/50 mb-3 flex items-center gap-2 text-xs font-bold tracking-wide uppercase">
                            <FaLink />
                            <span>Links</span>
                        </p>
                        <div className="flex flex-col gap-1.5">
                            <Link
                                href="https://blog.fascode.net/"
                                className="text-foreground/70 hover:text-foreground truncate text-xs transition-colors hover:underline"
                            >
                                Fascode Network Blog
                            </Link>
                            <Link
                                href="https://seppuku.club/"
                                className="text-foreground/70 hover:text-foreground truncate text-xs transition-colors hover:underline"
                            >
                                切腹倶楽部
                            </Link>
                        </div>
                    </div>

                    {/* Recent Posts */}
                    <div className="border-border/30 border-t p-4">
                        <Link
                            href="/blog/1"
                            className="text-foreground/50 mb-3 flex items-center gap-2 text-xs font-bold tracking-wide uppercase"
                        >
                            <FaClock />
                            <span>Recent Posts</span>
                        </Link>
                        <div className="flex flex-col gap-1.5">
                            {posts.map((p) => (
                                <Link
                                    key={p.file}
                                    href={`/blog/posts/${p.url}`}
                                    className="text-foreground/70 hover:text-foreground block min-w-0 truncate text-xs transition-colors hover:underline"
                                >
                                    {p.meta.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
