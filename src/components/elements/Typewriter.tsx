"use client";

import "nextjs-simple-typewriter/dist/index.css";

import { Cursor, CursorProps, TypewriterProps, useTypewriter } from "nextjs-simple-typewriter";
import { JSX, useCallback } from "react";

type ComponentProps = {
    /** Show / Hide the cursor */
    cursor?: boolean;
} & TypewriterProps &
    CursorProps;

// export const Typewriter = (props: ComponentProps) => <LibTypewriter {...props} />;

export const Typewriter = ({
    words,
    loop,
    typeSpeed = 80,
    deleteSpeed = 50,
    delaySpeed = 1500,
    cursor = false,
    cursorStyle = "|",
    cursorColor = "inherit",
    cursorBlinking = true,
    onLoopDone,
    onType,
    onDelay,
    onDelete,
}: ComponentProps): JSX.Element => {
    const [text] = useTypewriter({
        words,
        loop,
        typeSpeed,
        deleteSpeed,
        delaySpeed,
        onLoopDone,
        onType,
        onDelay,
        onDelete,
    });

    const CursorElement = useCallback(
        () => (cursor ? <Cursor cursorStyle={cursorStyle} cursorColor={cursorColor} cursorBlinking={cursorBlinking} /> : <></>),
        [cursor, cursorStyle, cursorColor, cursorBlinking],
    );

    const splited = text.split("\n");
    const currentLineNo = splited.length - 1;

    return (
        <div>
            {splited.map((item, index) => (
                <div className="flex items-end" key={index}>
                    <span>
                        {item}
                        <br />
                    </span>
                    {index === currentLineNo && <CursorElement />}
                </div>
            ))}
        </div>
    );
};
