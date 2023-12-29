//import { headers } from "next/headers";
import Link from "next/link";
import { FaLine, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

export interface ShareProps {
    url: string;
    text?: string;
}
export default function ShareBtns({ url, text }: ShareProps) {
    return (
        <div className="flex w-full items-center justify-end ">
            <div className="flex justify-end  child:m-2 child:flex child:justify-center child:rounded-lg child:p-3 child:shadow-lg">
                <ShareTwitter url={url} text={text} />
                <ShareFacebook url={url} />
                <ShareLine url={url} />
            </div>
        </div>
    );
}

const ShareTwitter = ({ url, text }: ShareProps) => {
    //const currentUrl = headers().get("next-url");
    return (
        <Link href={generateTwitterShareUrl(url, text)} className="bg-twitter">
            <FaTwitter className="text-base-100" />
        </Link>
    );
};

const ShareFacebook = ({ url }: ShareProps) => {
    return (
        <Link href={generateFaceBookShareUrl(url)} className="bg-facebook">
            <FaFacebook className="text-base-100" />
        </Link>
    );
};

const ShareLine = ({ url }: ShareProps) => {
    return (
        <Link href={generateLineShareUrl(url)} className="bg-line">
            <FaLine className="text-base-100" />
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
