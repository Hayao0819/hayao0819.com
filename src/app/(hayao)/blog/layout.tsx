import classNames from "clsx";
import { Link } from "next-view-transitions";

import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { fetchedBlogPostList as postlist } from "@/lib/blog/post";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const categories = postlist.getAllCategories();
    const tags = postlist.getAllTags();
    const posts = postlist.getPosts().slice(undefined, 10);

    const sectionClassName = classNames("p-5", { "shadow-lg": false, "": true });

    return (
        <CommonSpacer className="md:flex md:gap-2">
            <div className="mx-auto md:w-9/12 xl:w-2/3">{children}</div>
            <div className="flex flex-col gap-12 md:w-3/12 ">
                {/* Categories */}
                <div className={sectionClassName}>
                    <Link href="/blog/category">
                        <Heading level={2} className="border-b-2 border-accent text-accent">
                            Categories
                        </Heading>
                    </Link>
                    <ul>
                        {categories.map((c) => {
                            return (
                                <li key={c} role="link" className="my-2 cursor-pointer p-2 text-sm hover:underline">
                                    <Link href={`/blog/category/${c}`} className="block size-full">
                                        {c}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={sectionClassName}>
                    <Link href="/blog/category">
                        <Heading level={2} className="border-b-2 border-accent text-accent">
                            Tags
                        </Heading>
                    </Link>
                    <ul className="flex flex-wrap">
                        {tags.map((c) => {
                            return (
                                <li key={c} role="link" className="cursor-pointer p-2 text-sm hover:underline">
                                    <Link href={`/blog/tag/${c}`}>{c}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={sectionClassName}>
                    <Heading level={2} className="border-b-2 border-accent text-accent">
                        Links
                    </Heading>
                    <ul className="child:my-2 child:p-2">
                        <li>
                            <Link href="https://blog.fascode.net/">Fascode Network Blog</Link>
                        </li>
                        <li>
                            <Link href="https://seppuku.club/">切腹倶楽部</Link>
                        </li>
                    </ul>
                </div>

                {/* Recent Posts */}
                <div className={sectionClassName}>
                    <Heading level={2} className="border-b-2 border-accent text-accent">
                        Recent Posts
                    </Heading>
                    <ul>
                        {posts.map((p) => {
                            return (
                                <li key={p.file} role="link" className="my-2 cursor-pointer p-2 text-sm hover:underline">
                                    <Link href={`/blog/posts/${p.url}`}>{p.meta.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div>
                        <Link href="/blog/posts">
                            <p className="text-right text-sm text-accent hover:underline">全ての投稿</p>
                        </Link>
                    </div>
                </div>
            </div>
        </CommonSpacer>
    );
}
