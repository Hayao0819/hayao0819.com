import Link from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { getFetchedBlogPostList } from "@/lib/blog/post";

export default async function CategoryTop() {
    const tags = (await getFetchedBlogPostList()).getAllTags();
    return (
        <CommonSpacer>
            <div className="flex flex-col">
                {tags.map((c) => {
                    return (
                        <Link key={c} href={`/blog/tag/${c}`}>
                            {c}
                        </Link>
                    );
                })}
            </div>
        </CommonSpacer>
    );
}
