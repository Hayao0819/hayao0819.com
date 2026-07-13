import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram, FaKeybase, FaReddit, FaSpotify } from "react-icons/fa6";
import { SiBluesky, SiGitlab, SiMihoyo, SiMisskey, SiQiita, SiZenn } from "react-icons/si";

import { Link } from "@/components/elements/Link";
import PromptLine from "@/components/elements/PromptLine";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "SNS Links" });

type Social = {
    href: string;
    name: string;
    handle: string;
    icon: React.ReactNode;
};

const SOCIALS: Social[] = [
    { href: "https://github.com/Hayao0819", name: "GitHub", handle: "@Hayao0819", icon: <FaGithub /> },
    { href: "https://twitter.com/Hayao0819", name: "Twitter", handle: "@Hayao0819", icon: <FaTwitter /> },
    { href: "https://instagram.com/Hayao0819", name: "Instagram", handle: "@Hayao0819", icon: <FaInstagram /> },
    { href: "https://twitter.com/YamadaHayao", name: "Twitter", handle: "@YamadaHayao", icon: <FaTwitter /> },
    { href: "https://keybase.io/hayao0819", name: "Keybase", handle: "@hayao0819", icon: <FaKeybase /> },
    { href: "https://qiita.com/Hayao0819", name: "Qiita", handle: "@Hayao0819", icon: <SiQiita /> },
    { href: "https://gitlab.manjaro.org/Hayao0819", name: "GitLab", handle: "Manjaro", icon: <SiGitlab /> },
    { href: "https://bsky.app/profile/hayao.bsky.social", name: "Bluesky", handle: "@hayao.bsky.social", icon: <SiBluesky /> },
    { href: "https://msk.seppuku.club/@hayao", name: "Misskey", handle: "@hayao", icon: <SiMisskey /> },
    { href: "https://zenn.dev/hayao", name: "Zenn", handle: "@hayao", icon: <SiZenn /> },
    { href: "https://www.hoyolab.com/accountCenter/postList?id=176843313", name: "HoYoLAB", handle: "Hayao", icon: <SiMihoyo /> },
    { href: "https://www.reddit.com/user/Hayao0819/", name: "Reddit", handle: "u/Hayao0819", icon: <FaReddit /> },
    { href: "https://open.spotify.com/user/31l7ja2thmgpttj27kdf6m73irpa", name: "Spotify", handle: "Hayao", icon: <FaSpotify /> },
];

export default function Social() {
    return (
        <div>
            <header>
                <PromptLine>cat social.md</PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight md:text-4xl">Social</h1>
            </header>

            <hr className="hairline my-12" />

            <ul className="flex flex-col text-[13px]">
                {SOCIALS.map((s, i) => (
                    <li key={s.href + i}>
                        {i > 0 && <hr className="hairline opacity-15" />}
                        <Link
                            href={s.href}
                            className="group text-foreground/85 hover:text-foreground grid grid-cols-[1.5rem_7.5rem_1fr] items-baseline gap-3 py-3"
                        >
                            <span className="text-foreground/70 group-hover:text-foreground translate-y-[2px] text-[14px]">
                                {s.icon}
                            </span>
                            <span className="font-body-prose group-hover:text-accent text-[15px] leading-snug">{s.name}</span>
                            <span className="text-foreground/65 text-[11.5px] tracking-tight">{s.handle}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
