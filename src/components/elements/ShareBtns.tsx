//import { headers } from "next/headers";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";

export interface ShareProps {
    url: string;
    text: string;
}
export default function ShareBtns({ url, text }: ShareProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <FaShare />
            </div>
            <div className="flex w-full justify-end child:m-2 child:flex child:justify-center child:rounded-lg child:p-4">
                <ShareTwitter url={url} text={text} />
            </div>
        </div>
    );
}

const ShareTwitter = ({ url, text }: ShareProps) => {
    //const currentUrl = headers().get("next-url");
    return (
        <Link href={generateTwitterShareUrl(url, text)} className="bg-twitter">
            <FaTwitter />
        </Link>
    );
};

const generateTwitterShareUrl = (url: string, text: string) => {
    return `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
};
