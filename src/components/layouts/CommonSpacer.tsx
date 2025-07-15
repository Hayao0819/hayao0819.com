import classNames from "clsx";

export default function CommonSpacer({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={classNames("mx-auto mb-10 w-full md:p-10 xl:w-4/5", className)}>{children}</div>;
}
