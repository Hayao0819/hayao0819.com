import React from "react";

export interface ParagraphProps {
    children?: React.ReactNode;
}

export function P({ children }: ParagraphProps) {
    return <h1 className="py-4">{children}</h1>;
}
