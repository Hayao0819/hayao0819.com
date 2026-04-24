export default function Thanks() {
    return (
        <div className="border-border m-auto flex w-full max-w-2xl items-start justify-center border-4">
            <h1 className="border-border hidden self-stretch border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                Thanks
            </h1>
            <div className="flex min-w-0 flex-1 flex-col">
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">Thanks</h1>
                <div className="flex items-center justify-center p-8">
                    <p>現在工事中</p>
                </div>
            </div>
        </div>
    );
}
