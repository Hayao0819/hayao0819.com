import { Link } from "@/components/elements/Link";
import { SUMMARY_LENGTH } from "@/lib/blog/config";
import { StaticPostData } from "@/lib/markdown/post";
import * as utils from "@/lib/utils";

export type PostPreviewLayout = "featured" | "wide" | "narrow" | "compact";

interface PostPreviewProps {
    posts: StaticPostData;
    layout?: PostPreviewLayout;
    index?: number;
    align?: "left" | "right";
}

const PostPreview = ({ posts: post, layout = "wide" }: PostPreviewProps) => {
    if (!post.meta.title || !post.meta.date) {
        return <></>;
    }

    const postDate = new Date(post.meta.date);
    const fullURL = "/blog/posts/" + post.url;
    const primaryCategory = post.categories[0] ?? "";

    // FEATURED — first post: the lead story of the index.
    // Two-deck unit on wide pages: headline column left, dek + dateline right.
    if (layout === "featured") {
        return (
            <article className="group lg:grid lg:grid-cols-12 lg:gap-x-6">
                <div className="lg:col-span-7">
                    {primaryCategory && (
                        <p className="tracked-caps text-accent mb-4 text-[11px]">
                            <Link
                                href={`/blog/category/${primaryCategory}`}
                                className="hover:text-foreground inline-flex min-h-6 items-center transition-colors"
                            >
                                {primaryCategory}
                            </Link>
                        </p>
                    )}
                    <Link href={fullURL} className="block">
                        <h2 className="font-display text-ink group-hover:text-accent break-phrase max-w-[24ch] text-2xl leading-[1.25] font-black tracking-tight transition-colors duration-150 md:text-3xl md:leading-[1.2] lg:text-4xl">
                            {post.meta.title}
                        </h2>
                    </Link>
                </div>
                <div className="lg:col-span-5">
                    <p className="font-serif-jp text-foreground/75 mt-6 max-w-[42em] text-base leading-[1.85] lg:mt-1">
                        {utils.plainSummary(post.content, SUMMARY_LENGTH)}
                        <span aria-hidden>…</span>
                    </p>
                    <p className="text-foreground/75 mt-5 text-xs tabular-nums">{utils.dateToString(postDate, ".")}</p>
                </div>
            </article>
        );
    }

    // COMPACT — minimal index row
    if (layout === "compact") {
        return (
            <article className="group col-span-12">
                <Link href={fullURL} className="border-foreground/10 flex items-baseline gap-6 border-t py-6">
                    <span className="text-foreground/70 shrink-0 text-xs tabular-nums">{utils.dateToString(postDate, ".")}</span>
                    <span className="font-display group-hover:text-accent min-w-0 grow text-base leading-tight font-medium transition-colors duration-150 md:text-lg">
                        {post.meta.title}
                    </span>
                    {primaryCategory && (
                        <span className="text-foreground/70 hidden shrink-0 text-xs sm:inline">{primaryCategory}</span>
                    )}
                </Link>
            </article>
        );
    }

    // WIDE / NARROW — uniform table-of-contents rhythm.
    // Date column left, story centre, section column right; same grid on every row.
    return (
        <article className="group col-span-12">
            <div className="border-foreground/10 border-t" />
            <div className="grid grid-cols-12 gap-x-6 py-10">
                <span className="text-foreground/70 col-span-12 mb-3 text-xs tabular-nums md:col-span-2 md:mb-0">
                    {utils.dateToString(postDate, ".")}
                </span>
                <div className="col-span-12 min-w-0 md:col-span-8">
                    <Link href={fullURL} className="-my-0.5 block py-0.5">
                        <h2 className="font-display group-hover:text-accent break-phrase text-lg leading-[1.3] font-bold tracking-tight transition-colors duration-150 md:text-xl">
                            {post.meta.title}
                        </h2>
                    </Link>
                    <p className="font-serif-jp text-foreground/75 mt-3 max-w-[42em] text-base leading-[1.85]">
                        {utils.plainSummary(post.content, 180)}
                        <span aria-hidden>…</span>
                    </p>
                </div>
                {primaryCategory && (
                    <span className="col-span-12 mt-3 md:col-span-2 md:mt-0 md:text-right">
                        <Link
                            href={`/blog/category/${primaryCategory}`}
                            className="text-accent hover:text-foreground inline-flex min-h-6 items-center text-xs transition-colors duration-150"
                        >
                            {primaryCategory}
                        </Link>
                    </span>
                )}
            </div>
        </article>
    );
};

export default PostPreview;
