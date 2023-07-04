import { H2 } from "@/components/elements/Headlines";
import Link from "@/components/elements/Link";
//import { ReactNode } from "react";

function SocialLink(props: { children: string; domain: string; name: string }) {
    const url = "https://" + props.domain + "/" + props.children.toString();
    const linkview = props.name + " - @" + props.children.toString();
    return <Link href={url}>{linkview}</Link>;
}

function TwitterLink({ children }: { children: string }) {
    return (
        <SocialLink domain="twitter.com" name="Twitter">
            {children}
        </SocialLink>
    );
}

export default function Social() {
    return (
        <>
            <H2>SNSのリンクとかなんとか</H2>
            <p>気が向いたらかっちょいい感じに書き直します</p>
            <ul className="list-disc">
                <li>
                    <TwitterLink>Hayao0819</TwitterLink>
                </li>
                <li>
                    <TwitterLink>YamadaHayao</TwitterLink>
                </li>
                <li>
                    <SocialLink domain="instagram.com" name="Instagram">
                        Hayao0819
                    </SocialLink>
                </li>
                <li>
                    <SocialLink domain="github.com" name="GitHub">
                        Hayao0819
                    </SocialLink>
                </li>
            </ul>
        </>
    );
}
