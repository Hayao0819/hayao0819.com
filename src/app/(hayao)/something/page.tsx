import { Link } from "@/components/elements/Link";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Projects() {
    const postlist = getPJList();
    return (
        <div className="m-auto flex w-fit items-start justify-center border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="row-span-1 border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">
                    制作物
                </h1>
                <div className="flex flex-col">
                    <p className="border-b-4 border-base-content p-4 text-center">今までにつくった色々な何かへのリンクです。</p>
                    {postlist.map((p, i) => (
                        <Link
                            href={`/something/${p.url}`}
                            key={p.url}
                            className={`flex flex-col p-4 ${i < postlist.length - 1 ? "border-b-4 border-base-content" : ""}`}
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
