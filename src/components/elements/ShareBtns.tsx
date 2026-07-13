import { Link } from "@/components/elements/Link";

export interface ShareProps {
    url: string;
    text?: string;
}

export default function ShareBtns({ url, text }: ShareProps) {
    const targets: { label: string; href: string }[] = [
        { label: "twitter", href: generateTwitterShareUrl(url, text) },
        { label: "facebook", href: generateFaceBookShareUrl(url) },
        { label: "line", href: generateLineShareUrl(url) },
        { label: "linkedin", href: generateLinkedinShareUrl(url) },
    ];

    return (
        <div className="mono-eyebrow flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
            {targets.map((t) => (
                <Link key={t.label} href={t.href} className="text-foreground/70 hover:text-accent">
                    {`${t.label} →`}
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
