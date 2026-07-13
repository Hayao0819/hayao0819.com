import { Link } from "@/components/elements/Link";
import { PageContainer } from "@/components/elements/PageContainer";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { getFetchedProjectPostList } from "@/lib/projects";

export default function Projects() {
    const postlist = getFetchedProjectPostList().getPosts();
    return (
        <PageContainer>
            <PageMasthead title="制作物" lede="今までにつくった色々な何かへのリンクです。" />

            <section className="max-w-article">
                {postlist.map((p) => (
                    <Link key={p.url} href={`/something/${p.url}`} className="group block">
                        <div className="border-foreground/10 border-t py-8 first:border-t-0">
                            <p className="font-display group-hover:text-accent text-lg leading-tight font-medium transition-colors md:text-xl">
                                {p.meta.title}
                            </p>
                            {p.meta.description && (
                                <p className="text-foreground/75 mt-2 max-w-[58ch] text-sm leading-relaxed">
                                    {p.meta.description}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </section>
        </PageContainer>
    );
}
