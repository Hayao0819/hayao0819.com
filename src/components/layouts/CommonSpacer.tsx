import classNames from "classnames";

export default function CommonSpacer({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={classNames("mx-auto  md:2/3 lg:w-3/5", className)}>{children}</div>;
}
