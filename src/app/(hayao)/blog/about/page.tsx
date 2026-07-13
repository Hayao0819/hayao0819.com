import { PageMasthead } from "@/components/elements/PageMasthead";
import { genMetaData } from "@/lib/meta";

export const metadata = genMetaData({ title: "About" });

export default function BlogAbout() {
    return (
        <article className="max-w-article">
            <PageMasthead title="About" />

            <div className="font-serif-jp text-lg leading-[1.9]">
                <h2 className="font-bold">ハヤオについて</h2>
                <p className="mt-4">しがない理系もどき大学生</p>
            </div>
        </article>
    );
}
