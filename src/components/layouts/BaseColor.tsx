import { ReactNode } from "react";

export default function BaseColor({ children }: { children: ReactNode }) {
    return <div className="dark:bg-dark bg-slate-100 dark:text-slate-100">{children}</div>;
}
