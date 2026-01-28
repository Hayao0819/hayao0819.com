import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram, FaKeybase, FaReddit, FaSpotify } from "react-icons/fa6";
import {
    SiQiita,
    SiGitlab,
    SiBluesky,
    SiMisskey,
    SiZenn,
    SiMihoyo,
} from "react-icons/si";

import { SocialLink } from "@/components/elements/SocialLink";
import { VerticalLabel } from "@/components/elements/VerticalLabel";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "SNS Links" });

export default function Links() {
    return (
        <div className="m-auto flex w-full max-w-2xl items-start justify-center p-4">
            <div className="border-border w-full border-4">
                <div className="grid grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                    <VerticalLabel as="h1" className="text-2xl font-black">
                        Social
                    </VerticalLabel>
                    <div className="flex flex-col">
                        <div className="grid md:grid-cols-2">
                            <SocialLink
                                href="https://github.com/Hayao0819"
                                icon={<FaGithub />}
                                name="GitHub"
                                handle="@Hayao0819"
                                className="border-border border-b-4 md:border-r-4"
                            />
                            <SocialLink
                                href="https://twitter.com/Hayao0819"
                                icon={<FaTwitter />}
                                name="Twitter"
                                handle="@Hayao0819"
                                className="border-border border-b-4"
                            />
                            <SocialLink
                                href="https://instagram.com/Hayao0819"
                                icon={<FaInstagram />}
                                name="Instagram"
                                handle="@Hayao0819"
                                className="border-border border-b-4 md:border-r-4"
                            />
                            <SocialLink
                                href="https://twitter.com/YamadaHayao"
                                icon={<FaTwitter />}
                                name="Twitter"
                                handle="@YamadaHayao"
                                className="border-border border-b-4"
                            />
                            <SocialLink
                                href="https://keybase.io/hayao0819"
                                icon={<FaKeybase />}
                                name="Keybase"
                                handle="@hayao0819"
                                className="border-border border-b-4 md:border-r-4"
                            />
                            <SocialLink
                                href="https://qiita.com/Hayao0819"
                                icon={<SiQiita />}
                                name="Qiita"
                                handle="@Hayao0819"
                                className="border-border border-b-4"
                            />
                            <SocialLink
                                href="https://gitlab.manjaro.org/Hayao0819"
                                icon={<SiGitlab />}
                                name="GitLab"
                                handle="Manjaro"
                                className="border-border border-b-4 md:border-r-4"
                            />
                            <SocialLink
                                href="https://bsky.app/profile/hayao.bsky.social"
                                icon={<SiBluesky />}
                                name="Bluesky"
                                handle="@hayao.bsky.social"
                                className="border-border border-b-4"
                            />
                            <SocialLink
                                href="https://msk.seppuku.club/@hayao"
                                icon={<SiMisskey />}
                                name="Misskey"
                                handle="@hayao"
                                className="border-border border-b-4 md:border-r-4"
                            />
                            <SocialLink
                                href="https://zenn.dev/hayao"
                                icon={<SiZenn />}
                                name="Zenn"
                                handle="@hayao"
                                className="border-border border-b-4"
                            />
                            <SocialLink
                                href="https://www.hoyolab.com/accountCenter/postList?id=176843313"
                                icon={<SiMihoyo />}
                                name="HoYoLAB"
                                handle="Hayao"
                                className="border-border border-b-4 md:border-r-4"
                            />
                            <SocialLink
                                href="https://www.reddit.com/user/Hayao0819/"
                                icon={<FaReddit />}
                                name="Reddit"
                                handle="u/Hayao0819"
                                className="border-border border-b-4"
                            />
                            <SocialLink
                                href="https://open.spotify.com/user/31l7ja2thmgpttj27kdf6m73irpa"
                                icon={<FaSpotify />}
                                name="Spotify"
                                handle="Hayao"
                                className="md:col-span-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
