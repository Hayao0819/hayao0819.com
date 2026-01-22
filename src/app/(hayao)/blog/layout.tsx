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
            <div className="hidden border-4 border-base-content md:block">
                <div className="grid grid-cols-[auto_1fr] gap-0">
                    <div className="row-span-4 border-r-4 border-base-content p-2 text-sm font-bold [writing-mode:vertical-lr]">
                        Menu
                    </div>
                    <div className="flex flex-col">
                        {/* Categories */}
                        <div className="border-b-4 border-base-content p-3">
                            <Link href="/blog/category" className="mb-2 block font-bold">
                                Categories
                            </Link>
                            <div className="flex flex-wrap gap-1">
                                {categories.map((c) => (
                                    <Link
                                        key={c}
                                        href={`/blog/category/${c}`}
                                        className="border border-base-content px-2 py-0.5 text-xs hover:bg-base-content hover:text-base-100"
                                    >
                                        {c}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="border-b-4 border-base-content p-3">
                            <Link href="/blog/tag" className="mb-2 block font-bold">
                                Tags
                            </Link>
                            <div className="flex max-w-56 flex-wrap gap-1">
                                {tags.map((c) => (
                                    <Link
                                        key={c}
                                        href={`/blog/tag/${c}`}
                                        className="border border-base-content px-2 py-0.5 text-xs hover:bg-base-content hover:text-base-100"
                                    >
                                        #{c}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="border-b-4 border-base-content p-3">
                            <p className="mb-2 font-bold">Links</p>
                            <div className="flex flex-col gap-1 text-xs">
                                <Link href="https://blog.fascode.net/" className="underline">
                                    Fascode Network Blog
                                </Link>
                                <Link href="https://seppuku.club/" className="underline">
                                    切腹倶楽部
                                </Link>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="p-3">
                            <Link href="/blog/1" className="mb-2 block font-bold">
                                Recent Posts
                            </Link>
                            <div className="flex max-w-56 flex-col gap-1">
                                {posts.map((p) => (
                                    <Link key={p.file} href={`/blog/posts/${p.url}`} className="truncate text-xs hover:underline">
                                        {p.meta.title}
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
