import { FaFacebook, FaLine, FaLinkedin, FaTwitter } from "react-icons/fa6";

import { Link } from "@/components/elements/Link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface ShareProps {
    url: string;
    text?: string;
}
export default function ShareBtns({ url, text }: ShareProps) {
    return (
        <div className="flex w-full flex-wrap items-center justify-center">
            <TooltipProvider>
                <div className="flex flex-wrap justify-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild className="bg-twitter text-background hover:bg-twitter/90 shadow-lg">
                                <Link href={generateTwitterShareUrl(url, text)}>
                                    <FaTwitter className="mr-2" />
                                    <span>Tweet</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Twitterで共有</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild className="bg-facebook text-background hover:bg-facebook/90 shadow-lg">
                                <Link href={generateFaceBookShareUrl(url)}>
                                    <FaFacebook className="mr-2" />
                                    <span>Share</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Facebookで共有</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild className="bg-line text-background hover:bg-line/90 shadow-lg">
                                <Link href={generateLineShareUrl(url)}>
                                    <FaLine className="mr-2" />
                                    <span>Send</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">LINEで共有</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild className="bg-linkedin text-background hover:bg-linkedin/90 shadow-lg">
                                <Link href={generateLinkedinShareUrl(url)}>
                                    <FaLinkedin className="mr-2" />
                                    <span>Share</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Linkedinで共有</TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    );
}

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
