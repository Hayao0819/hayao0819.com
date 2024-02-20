"use client";

import { loadDefaultJapaneseParser } from "budoux";
import { ReactNode } from "react";
const parser = loadDefaultJapaneseParser();

export default function BudouX({ children }: { children?: string }): ReactNode {
    if (!children) {
        return null;
    }

    return parser.parse(children).map((s) => (
        <span className="inline-block" key={s}>
            {s}
        </span>
    ));
}
