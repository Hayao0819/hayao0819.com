import { ReactNode } from "react";
//import { H2 } from "./Headlines";


const BlogTitle = ({children}: {children: ReactNode}) => {
    return (
        <div className="w-full bg-primary">
            <h2>{children}</h2>
        </div>
    );
};

export default BlogTitle;
