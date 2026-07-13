import { Link } from "@/components/elements/Link";
import { PageContainer } from "@/components/elements/PageContainer";
import { PageMasthead } from "@/components/elements/PageMasthead";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "SNS Links" });

interface SocialEntry {
    href: string;
    name: string;
    handle: string;
}

const SOCIALS: SocialEntry[] = [
    { href: "https://github.com/Hayao0819", name: "GitHub", handle: "@Hayao0819" },
    { href: "https://twitter.com/Hayao0819", name: "Twitter", handle: "@Hayao0819" },
    { href: "https://instagram.com/Hayao0819", name: "Instagram", handle: "@Hayao0819" },
    { href: "https://twitter.com/YamadaHayao", name: "Twitter", handle: "@YamadaHayao" },
    { href: "https://keybase.io/hayao0819", name: "Keybase", handle: "@hayao0819" },
    { href: "https://qiita.com/Hayao0819", name: "Qiita", handle: "@Hayao0819" },
    { href: "https://gitlab.manjaro.org/Hayao0819", name: "GitLab", handle: "Manjaro" },
    { href: "https://bsky.app/profile/hayao.bsky.social", name: "Bluesky", handle: "@hayao.bsky.social" },
    { href: "https://msk.seppuku.club/@hayao", name: "Misskey", handle: "@hayao" },
    { href: "https://zenn.dev/hayao", name: "Zenn", handle: "@hayao" },
    { href: "https://www.hoyolab.com/accountCenter/postList?id=176843313", name: "HoYoLAB", handle: "Hayao" },
    { href: "https://www.reddit.com/user/Hayao0819/", name: "Reddit", handle: "u/Hayao0819" },
    { href: "https://open.spotify.com/user/31l7ja2thmgpttj27kdf6m73irpa", name: "Spotify", handle: "Hayao" },
];

export default function Social() {
    return (
        <PageContainer>
            <PageMasthead title="Social" />

            <section className="max-w-article">
                {SOCIALS.map((s) => (
                    <Link key={s.href} href={s.href} className="group block">
                        <div className="border-foreground/10 flex items-baseline gap-6 border-t py-5 first:border-t-0">
                            <p className="font-display group-hover:text-accent min-w-0 flex-1 text-lg leading-tight font-medium transition-colors md:text-xl">
                                {s.name}
                            </p>
                            <p className="text-foreground/75 shrink-0 text-sm">{s.handle}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </PageContainer>
    );
}
