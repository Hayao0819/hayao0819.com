export default function Playground() {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl">Playground</h1>

            {["bg-primary", "bg-secondary", "bg-accent", "bg-neutral"].map((c) => {
                return (
                    <div className={"flex items-center justify-center h-12 w-48 m-4 " + c} key={c}>
                        <p className="text-center text-base-100">{c}</p>
                    </div>
                );
            })}
        </div>
    );
}
