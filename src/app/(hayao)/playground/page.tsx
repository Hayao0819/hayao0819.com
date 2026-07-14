import { AnimatedLink } from "@/components/elements/Link";

export default function Playground() {
    return (
        <div className="m-auto flex w-full max-w-2xl items-start justify-center border-4 border-border">
            <h1 className="hidden self-stretch border-border border-r-4 p-4 font-bold text-3xl [writing-mode:vertical-lr] md:block">
                Playground
            </h1>
            <div className="flex min-w-0 flex-1 flex-col">
                <h1 className="border-border border-b-4 p-4 font-bold text-3xl md:hidden">Playground</h1>
                <div className="border-border border-b-4 p-4">
                    <p className="mb-2 font-bold">Colors</p>
                    <ColorList />
                </div>
                <div className="border-border border-b-4 p-4">
                    <p className="mb-2 font-bold">Class Test</p>
                    <ClassTest />
                </div>
                <div className="p-4">
                    <p className="mb-2 font-bold">Link Test</p>
                    <LinkTest />
                </div>
            </div>
        </div>
    );
}

function ColorList() {
    return (
        <div className="flex flex-wrap gap-2">
            {["bg-primary", "bg-secondary", "bg-accent", "bg-neutral"].map((c) => (
                <div className={`flex h-10 w-24 items-center justify-center${c}`} key={c}>
                    <p className="text-center text-background text-xs">{c}</p>
                </div>
            ))}
        </div>
    );
}

function ClassTest() {
    class myClass {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        say() {
            console.log(this.name);
        }
    }

    type myType = {
        name: string;
    };

    const myClassInstance: myType = new myClass("myClass");

    return <span>{myClassInstance.name}</span>;
}

function LinkTest() {
    return <AnimatedLink href="https://google.com">Google</AnimatedLink>;
}
