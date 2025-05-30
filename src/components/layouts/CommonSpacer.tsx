import classNames from "clsx";

export default function CommonSpacer({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={classNames("mx-auto w-full xl:w-4/5 md:p-5 mb-10", className)}>{children}</div>;
}
