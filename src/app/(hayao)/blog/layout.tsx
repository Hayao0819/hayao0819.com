import { FaFolder, FaGithub, FaLink, FaTags, FaTwitter } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { fetchedBlogPostList as postlist } from "@/lib/blog/post";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const categories = postlist.getAllCategories();
    const tags = postlist.getAllTags();
    const posts = postlist.getPosts().slice(undefined, 10);

    return (
        <div className="m-auto flex w-fit items-start justify-center gap-4 p-4">
            {/* Main Content */}
            <div>{children}</div>

            {/* Sidebar */}
            <div className="hidden w-72 shrink-0 overflow-hidden border-4 border-base-content md:block">
                <div className="grid grid-cols-[auto_1fr] gap-0">
                    <div className="row-span-6 border-r-4 border-base-content p-2 text-sm font-bold [writing-mode:vertical-lr]">
                        Menu
                    </div>
                    <div className="flex min-w-0 flex-col overflow-hidden">
                        {/* About */}
                        <div className="border-b-4 border-base-content p-4">
                            <p className="mb-3 text-lg font-bold">Yamada Hayao</p>
                            <p className="mb-3 text-xs leading-relaxed text-base-content/70">
                                パソコンが好きな大学生。Webやセキュリティに興味あり。
                            </p>
                            <div className="flex gap-2">
                                <Link
                                    href="https://twitter.com/Hayao0819"
                                    className="flex items-center justify-center border-2 border-base-content p-2 transition-all hover:bg-base-content hover:text-base-100"
                                >
                                    <FaTwitter className="text-lg" />
                                </Link>
                                <Link
                                    href="https://github.com/Hayao0819"
                                    className="flex items-center justify-center border-2 border-base-content p-2 transition-all hover:bg-base-content hover:text-base-100"
                                >
                                    <FaGithub className="text-lg" />
                                </Link>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="border-b-4 border-base-content p-4">
                            <Link href="/blog/category" className="mb-3 flex items-center gap-2 font-bold">
                                <FaFolder className="text-base-content/70" />
                                <span>Categories</span>
                            </Link>
                            <div className="flex flex-wrap gap-1.5">
                                {categories.map((c) => (
                                    <Link
                                        key={c}
                                        href={`/blog/category/${c}`}
                                        className="max-w-full truncate border-2 border-base-content px-2.5 py-1 text-xs font-medium transition-all hover:bg-base-content hover:text-base-100"
                                    >
                                        {c}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="border-b-4 border-base-content p-4">
                            <Link href="/blog/tag" className="mb-3 flex items-center gap-2 font-bold">
                                <FaTags className="text-base-content/70" />
                                <span>Tags</span>
                            </Link>
                            <div className="flex flex-wrap gap-1.5">
                                {tags.slice(0, 15).map((c) => (
                                    <Link
                                        key={c}
                                        href={`/blog/tag/${c}`}
                                        className="max-w-full truncate border border-base-content/50 px-2 py-0.5 text-xs transition-all hover:border-base-content hover:bg-base-content hover:text-base-100"
                                    >
                                        #{c}
                                    </Link>
                                ))}
                                {tags.length > 15 && (
                                    <Link
                                        href="/blog/tag"
                                        className="px-2 py-0.5 text-xs text-base-content/50 hover:text-base-content"
                                    >
                                        +{tags.length - 15} more
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="border-b-4 border-base-content p-4">
                            <p className="mb-3 flex items-center gap-2 font-bold">
                                <FaLink className="text-base-content/70" />
                                <span>Links</span>
                            </p>
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="https://blog.fascode.net/"
                                    className="group flex items-center gap-2 text-sm transition-all"
                                >
                                    <span className="h-1.5 w-1.5 shrink-0 bg-base-content/30 transition-all group-hover:bg-base-content" />
                                    <span className="truncate group-hover:underline">Fascode Network Blog</span>
                                </Link>
                                <Link
                                    href="https://seppuku.club/"
                                    className="group flex items-center gap-2 text-sm transition-all"
                                >
                                    <span className="h-1.5 w-1.5 shrink-0 bg-base-content/30 transition-all group-hover:bg-base-content" />
                                    <span className="truncate group-hover:underline">切腹倶楽部</span>
                                </Link>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="p-4">
                            <Link href="/blog/1" className="mb-3 flex items-center gap-2 font-bold">
                                <FaClock className="text-base-content/70" />
                                <span>Recent Posts</span>
                            </Link>
                            <div className="flex flex-col gap-2">
                                {posts.map((p) => (
                                    <Link
                                        key={p.file}
                                        href={`/blog/posts/${p.url}`}
                                        className="group block min-w-0 border-l-2 border-base-content/20 pl-3 transition-all hover:border-base-content"
                                    >
                                        <p className="truncate text-sm group-hover:underline">{p.meta.title}</p>
                                        <p className="truncate text-xs text-base-content/50">{p.meta.category}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
