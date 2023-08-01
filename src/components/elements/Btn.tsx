import { ReactNode } from "react";

const Btn = ({ children }: { children: ReactNode }): ReactNode => {
    return <button className="daisy-btn bg-transparent hover:bg-transparent">{children}</button>;
};

export default Btn;
