import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Something() {
    const postlist = getPJList();
    return (
        <div>
            <header>
                <PromptLine path="~/something">ls</PromptLine>
                <h1 className="mt-4 font-body-prose text-3xl leading-tight tracking-tight md:text-4xl">制作物</h1>
                <p className="mt-6 max-w-[46rem] font-body-prose text-[17px] text-foreground/90 leading-[1.9]">
                    今までにつくった色々な何かへのリンクです。
                </p>
            </header>

            <hr className="hairline my-12" />

            <ul className="flex flex-col gap-1 text-[13px]">
                {postlist.map((p) => (
                    <li key={p.url}>
                        <Link
                            href={`/something/${p.url}`}
                            className="group grid grid-cols-1 items-baseline gap-1 py-3 text-foreground/85 hover:text-foreground md:grid-cols-[1fr_auto]"
                        >
                            <span className="flex flex-col gap-0.5">
                                <span className="font-body-prose text-[15px] leading-snug group-hover:text-accent">
                                    {p.meta.title}
                                </span>
                                <span className="text-[11.5px] text-foreground/70">{p.meta.description}</span>
                            </span>
                            <span className="text-foreground/30 group-hover:text-foreground/70 md:self-start" aria-hidden="true">
                                &rarr;
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const getPJList = () => getFetchedProjectPostList().getPosts();
