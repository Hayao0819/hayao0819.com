export default function Thanks() {
    return (
        <div className="border-border m-auto flex w-full max-w-2xl items-start justify-center border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">Thanks</h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">Thanks</h1>
                <div className="flex items-center justify-center p-8">
                    <p>現在工事中</p>
                </div>
            </div>
        </div>
    );
}
