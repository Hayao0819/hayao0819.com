export default function BlogAbout() {
    return (
        <div className="border-border flex w-full border-4">
            <h1 className="border-border hidden self-stretch border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">
                About
            </h1>
            <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">About</h1>
            <div className="flex min-w-0 flex-1 flex-col items-center justify-center p-8">
                <p className="text-xl font-bold">ハヤオについて</p>
                <p className="mt-2">しがない理系もどき大学生</p>
            </div>
        </div>
    );
}
