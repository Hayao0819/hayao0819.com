import { Link } from "@/components/elements/Link";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Projects() {
    const postlist = getPJList();
    return (
        <div className="border-border m-auto flex w-full max-w-2xl items-start justify-center border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border row-span-1 hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                    制作物
                </h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">制作物</h1>
                <div className="flex flex-col">
                    <p className="border-border border-b-4 p-4 text-center">今までにつくった色々な何かへのリンクです。</p>
                    {postlist.map((p, i) => (
                        <Link
                            href={`/something/${p.url}`}
                            key={p.url}
                            className={`flex flex-col p-4 ${i < postlist.length - 1 ? "border-border border-b-4" : ""}`}
                        >
                            <span className="font-bold">{p.meta.title}</span>
                            <span className="text-sm">{p.meta.description}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

const getPJList = () => getFetchedProjectPostList().getPosts();
