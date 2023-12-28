import classNames from "classnames";

export default function CommonSpacer({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={classNames("mx-auto w-4/5 p-5", className)}>{children}</div>;
}
