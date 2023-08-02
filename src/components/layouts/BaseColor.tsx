import { ReactNode } from "react";

export const bgColorClass = " bg-base-300"

export default function BaseColor({ children }: { children: ReactNode }) {
    return <div className={"dark:text-slate-100 "+bgColorClass}>{children}</div>;
}
