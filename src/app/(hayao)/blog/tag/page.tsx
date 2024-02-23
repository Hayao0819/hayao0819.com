import Link from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import { fetchedBlogPostList } from "@/lib/blog/post";

export default function CategoryTop() {
    const tags = fetchedBlogPostList.getAllTags();
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
