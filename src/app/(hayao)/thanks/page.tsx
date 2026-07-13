import PromptLine from "@/components/elements/PromptLine";

export default function Thanks() {
    return (
        <div>
            <header>
                <PromptLine>cat thanks.md</PromptLine>
                <h1 className="font-body-prose mt-4 text-3xl leading-tight tracking-tight md:text-4xl">Thanks</h1>
            </header>

            <hr className="hairline my-12" />

            <p className="text-foreground/70 text-center text-[13px]">現在工事中</p>
        </div>
    );
}
