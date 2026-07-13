import { Link } from "@/components/elements/Link";

export interface ShareProps {
    url: string;
    text?: string;
}

export default function ShareBtns({ url, text }: ShareProps) {
    const targets = [
        { name: "Twitter", href: generateTwitterShareUrl(url, text) },
        { name: "Facebook", href: generateFaceBookShareUrl(url) },
        { name: "LINE", href: generateLineShareUrl(url) },
        { name: "LinkedIn", href: generateLinkedinShareUrl(url) },
    ];

    return (
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
            <span className="text-foreground/70 text-xs">Share —</span>
            {targets.map((t) => (
                <Link
                    key={t.name}
                    href={t.href}
                    className="text-foreground/75 hover:text-accent inline-flex min-h-6 items-center transition-colors duration-150"
                >
                    {t.name}
                </Link>
            ))}
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
