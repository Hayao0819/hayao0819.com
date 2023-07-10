import { ReactNode } from "react";
//import { H2 } from "./Headlines";

const BlogTitle = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full border-2">
            <h2>{children}</h2>
        </div>
    );
};

export default BlogTitle;
