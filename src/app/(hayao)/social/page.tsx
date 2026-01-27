import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaInstagram, FaKeybase } from "react-icons/fa6";

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
                                className="md:col-span-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
