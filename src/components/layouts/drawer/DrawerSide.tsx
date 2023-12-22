import Link from "next/link";

export default function DrawerSide() {
    return (
        <div className="h-full w-1/3 bg-neutral text-neutral-content">
            <div className="text-center">
                <Link className="btn btn-ghost text-lg" href="/" role="button">
                    Yamada Hayao
                </Link>
            </div>
        </div>
    );
}
