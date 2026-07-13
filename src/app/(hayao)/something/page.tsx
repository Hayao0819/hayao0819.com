import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Something() {
    const postlist = getPJList();
    return (
        <div>
            <header>
                <PromptLine path="~/something">ls</PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight md:text-4xl">制作物</h1>
                <p className="font-body-prose text-foreground/90 mt-6 max-w-[46rem] text-[17px] leading-[1.9]">
                    今までにつくった色々な何かへのリンクです。
                </p>
            </header>

            <hr className="hairline my-12" />

            <ul className="flex flex-col gap-1 text-[13px]">
                {postlist.map((p) => (
                    <li key={p.url}>
                        <Link
                            href={`/something/${p.url}`}
                            className="group text-foreground/85 hover:text-foreground grid grid-cols-1 items-baseline gap-1 py-3 md:grid-cols-[1fr_auto]"
                        >
                            <span className="flex flex-col gap-0.5">
                                <span className="font-body-prose group-hover:text-accent text-[15px] leading-snug">
                                    {p.meta.title}
                                </span>
                                <span className="text-foreground/70 text-[11.5px]">{p.meta.description}</span>
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
