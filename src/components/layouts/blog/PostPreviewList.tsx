import { Link } from "@/components/elements/Link";
import type { PostData } from "@/lib/markdown/post";

import PostPreview from "./PostPreview";

export interface PostListProps {
    posts: PostData[];
}

export function PostList({ posts }: PostListProps) {
    return (
        <div className="flex flex-col">
            {posts.map((f, i) => (
                <div key={f.file}>
                    {i > 0 && <hr className="hairline my-8" />}
                    <PostPreview posts={f.getStaticData()} />
                </div>
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
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px]" aria-label="pagination">
            {hasPrev ? (
                <Link
                    href={linktemplate(currentPage - 1)}
                    className="inline-flex min-h-11 items-center px-1 text-foreground/70 tracking-[0.14em] hover:text-accent"
                >
                    &larr; prev
                </Link>
            ) : (
                <span className="inline-flex min-h-11 items-center px-1 text-foreground/35 tracking-[0.14em]" aria-hidden="true">
                    &larr; prev
                </span>
            )}
            <span className="flex items-center gap-1">
                {[...Array(allpages)].map((_, idx) => {
                    const i = idx + 1;
                    const isCurrent = i === currentPage;
                    const num = String(i).padStart(2, "0");
                    return (
                        <span key={i} aria-current={isCurrent ? "page" : undefined} className="tabular-nums">
                            {isCurrent ? (
                                <span className="inline-flex h-11 w-8 items-center justify-center text-accent">
                                    <span className="border-accent border-b">{num}</span>
                                </span>
                            ) : (
                                <Link
                                    href={linktemplate(i)}
                                    className="inline-flex h-11 w-8 items-center justify-center text-foreground/65 hover:text-foreground"
                                >
                                    {num}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </span>
            {hasNext ? (
                <Link
                    href={linktemplate(currentPage + 1)}
                    className="inline-flex min-h-11 items-center px-1 text-foreground/70 tracking-[0.14em] hover:text-accent"
                >
                    next &rarr;
                </Link>
            ) : (
                <span className="inline-flex min-h-11 items-center px-1 text-foreground/35 tracking-[0.14em]" aria-hidden="true">
                    next &rarr;
                </span>
            )}
        </nav>
    );
}
