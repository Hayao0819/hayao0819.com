import { ReactNode } from "react";

const Btn = ({ children }: { children: ReactNode }): ReactNode => {
    return <button className="daisy-btn-neutral daisy-btn-active daisy-btn m-2">{children}</button>;
};

export default Btn;
