"use client";

import { useState } from "react";

const Header = () => {
    console.log("Header rendered!");
    return <p>ボタンをクリックすると数字が増えるよ！</p>;
};

const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const incrementCount = () => setCount(count + 1);
    return (
        <div>
            <Header />
            <p>{count}</p>
            <button onClick={incrementCount}>Click me!</button>
        </div>
    );
};

export { Counter as default };
