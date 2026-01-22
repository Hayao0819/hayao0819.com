export default function BlogAbout() {
    return (
        <div className="border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">About</h1>
                <div className="flex flex-col items-center justify-center p-8">
                    <p className="text-xl font-bold">ハヤオについて</p>
                    <p className="mt-2">しがない理系もどき大学生</p>
                </div>
            </div>
        </div>
    );
}
