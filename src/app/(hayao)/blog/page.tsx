import { Link } from "@/components/elements/Link";

// output: "export" turns a runtime redirect() into an empty error shell,
// so ship a real document with a meta refresh that works without JS.
export default function BlogIndex() {
    return (
        <div>
            <meta httpEquiv="refresh" content="0;url=/blog/1/" />
            <p className="mono-eyebrow">redirecting…</p>
            <p className="mt-4 text-[13px]">
                <Link href="/blog/1" className="link-ai">
                    /blog/1 &rarr;
                </Link>
            </p>
        </div>
    );
}
