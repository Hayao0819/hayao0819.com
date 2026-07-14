import PromptLine from "@/components/elements/PromptLine";

export default function BlogAbout() {
    return (
        <div>
            <header className="mb-10">
                <PromptLine path="~/blog">cat about.md</PromptLine>
                <h1 className="mt-4 font-body-prose text-3xl leading-tight tracking-tight">About</h1>
            </header>
            <hr className="hairline mb-10" />

            <div className="font-body-prose text-[17px] text-foreground/90 leading-[1.9] md:text-[18px]">
                <h2 className="font-medium text-foreground">ハヤオについて</h2>
                <p className="mt-2">しがない理系もどき大学生</p>
            </div>
        </div>
    );
}
