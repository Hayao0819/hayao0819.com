export default function BlogAbout() {
    return (
        <div className="border-border w-full border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                    About
                </h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">About</h1>
                <div className="flex flex-col items-center justify-center p-8">
                    <p className="text-xl font-bold">ハヤオについて</p>
                    <p className="mt-2">しがない理系もどき大学生</p>
                </div>
            </div>
        </div>
    );
}
