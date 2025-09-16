//import { headers } from "next/headers";
import { FaFacebook, FaLine, FaLinkedin, FaTwitter } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";

export interface ShareProps {
    url: string;
    text?: string;
}
export default function ShareBtns({ url, text }: ShareProps) {
    return (
        <div className="flex w-full flex-wrap items-center justify-center">
            <div className="flex flex-wrap justify-center child:btn child:tooltip child:tooltip-bottom child:m-2 child:flex child:justify-center child:p-3 child:!text-base-100 child:shadow-lg">
                <ShareTwitter url={url} text={text} />
                <ShareFacebook url={url} />
                <ShareLine url={url} />
                <ShareLinkedin url={url} />
            </div>
        </div>
    );
}

const ShareTwitter = ({ url, text }: ShareProps) => {
    //const currentUrl = headers().get("next-url");
    return (
        <Link href={generateTwitterShareUrl(url, text)} className="!bg-twitter" data-tip="Twitterで共有">
            <FaTwitter className="" />
            <span>Tweet</span>
        </Link>
    );
};

const ShareFacebook = ({ url }: ShareProps) => {
    return (
        <Link href={generateFaceBookShareUrl(url)} className="!bg-facebook" data-tip="Facebookで共有">
            <FaFacebook />
            <span>Share</span>
        </Link>
    );
};

const ShareLine = ({ url }: ShareProps) => {
    return (
        <Link href={generateLineShareUrl(url)} className="!bg-line" data-tip="LINEで共有">
            <FaLine />
            <span>Send</span>
        </Link>
    );
};

const ShareLinkedin = ({ url }: ShareProps) => {
    return (
        <Link href={generateLinkedinShareUrl(url)} className="!bg-linkedin" data-tip="Linkedinで共有">
            <FaLinkedin />
            <span>Share</span>
        </Link>
    );
};

const generateTwitterShareUrl = (url: string, text?: string) => {
    if (text === undefined) {
        text = "";
    }
    return `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
};

const generateFaceBookShareUrl = (url: string) => {
    return `https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`;
};

const generateLineShareUrl = (url: string) => {
    return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
};

const generateLinkedinShareUrl = (url: string) => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
};
