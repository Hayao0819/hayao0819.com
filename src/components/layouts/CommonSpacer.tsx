import classNames from "classnames";

export default function CommonSpacer({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={classNames("mx-auto w-1/2", className)}>{children}</div>;
}
