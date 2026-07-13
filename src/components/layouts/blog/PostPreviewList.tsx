import classNames from "clsx";

import { Link } from "@/components/elements/Link";
import { PostData } from "@/lib/markdown/post";

import PostPreview, { PostPreviewLayout } from "./PostPreview";

export interface PostListProps {
    posts: PostData[];
    /** Pattern of layouts to use across posts. Defaults to editorial asymmetric. */
    pattern?: PostPreviewLayout[];
    /** Whether the first post should be the big featured headline. */
    showFeatured?: boolean;
    /** Force every entry to a single layout (e.g. for tag pages). */
    uniform?: PostPreviewLayout;
}

export function PostList({ posts, showFeatured = true, uniform }: PostListProps) {
    const featured = !uniform && showFeatured ? posts[0] : undefined;
    const rows = featured ? posts.slice(1) : posts;

    return (
        <div className="grid grid-cols-12">
            {featured && (
                <div className="col-span-12 mb-14">
                    <PostPreview posts={featured.getStaticData()} layout="featured" index={0} />
                </div>
            )}
            {rows.map((f, i) => (
                <PostPreview posts={f.getStaticData()} layout={uniform ?? "wide"} index={i} key={f.file} />
            ))}
        </div>
    );
}

export interface PostPageSwitchProps {
    allpages: number;
    currentPage: number;
    linktemplate: (page: number) => string;
}
export function PostPageSwitch({ allpages, currentPage, linktemplate }: PostPageSwitchProps) {
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < allpages;

    return (
        <div className="border-foreground/15 mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <div className="text-foreground/75 text-sm tabular-nums">
                Page {currentPage} of {allpages}
            </div>
            <nav className="flex flex-wrap items-center gap-1" aria-label="Pagination">
                {hasPrev ? (
                    <Link
                        href={linktemplate(currentPage - 1)}
                        className="text-foreground/75 hover:text-accent flex h-10 items-center gap-2 px-3 text-sm transition-colors"
                        rel="prev"
                    >
                        <span aria-hidden>&larr;</span>
                        <span>Previous</span>
                    </Link>
                ) : (
                    <span className="text-foreground/60 flex h-10 items-center gap-2 px-3 text-sm" aria-disabled="true">
                        <span aria-hidden>&larr;</span>
                        <span>Previous</span>
                    </span>
                )}
                {[...Array(allpages)].map((_, idx) => {
                    const i = idx + 1;
                    const isCurrent = i === currentPage;
                    const numberClasses = classNames(
                        "font-display flex h-10 min-w-10 items-center justify-center text-base tabular-nums transition-colors",
                        isCurrent
                            ? "text-accent decoration-accent decoration-2 font-bold underline underline-offset-8"
                            : "text-foreground/70 hover:text-accent",
                    );
                    return isCurrent ? (
                        <span key={i} className={numberClasses} aria-current="page">
                            {i}
                        </span>
                    ) : (
                        <Link key={i} href={linktemplate(i)} className={numberClasses}>
                            {i}
                        </Link>
                    );
                })}
                {hasNext ? (
                    <Link
                        href={linktemplate(currentPage + 1)}
                        className="text-foreground/75 hover:text-accent flex h-10 items-center gap-2 px-3 text-sm transition-colors"
                        rel="next"
                    >
                        <span>Next</span>
                        <span aria-hidden>&rarr;</span>
                    </Link>
                ) : (
                    <span className="text-foreground/60 flex h-10 items-center gap-2 px-3 text-sm" aria-disabled="true">
                        <span>Next</span>
                        <span aria-hidden>&rarr;</span>
                    </span>
                )}
            </nav>
        </div>
    );
}
