import Link from "next/link";

import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getAllCategories } from "@/lib/blog/categories";
import { PostList } from "@/lib/blog/postlist";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const categories = getAllCategories();
    const postlist = new PostList().fetch().getPosts().slice(undefined, 10);

    return (
        <CommonSpacer className="md:flex">
            <div className="md:w-9/12">{children}</div>
            <div className="md:w-3/12">
                <div className="p-5 shadow-lg">
                    <Link href="/blog/category">
                        <Heading level={2} className="border-b-2 border-accent text-accent">
                            Categories
                        </Heading>
                    </Link>
                    <ul>
                        {categories.map((c) => {
                            return (
                                <li key={c} role="link" className="my-2 cursor-pointer p-2 text-sm hover:underline">
                                    <Link href={`/blog/category/${c}`}>{c}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="p-5 shadow-lg">
                    <Heading level={2} className="border-b-2 border-accent text-accent">
                        Recent Posts
                    </Heading>
                    <ul>
                        {postlist.map((p) => {
                            return (
                                <li key={p.file} role="link" className="my-2 cursor-pointer p-2 text-sm hover:underline">
                                    <Link href={`/blog/posts/${p.url}`}>{p.meta.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </CommonSpacer>
    );
}
