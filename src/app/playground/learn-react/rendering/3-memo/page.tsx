"use client";

import { memo, useState } from "react";

const Header = memo(() => {
    console.log("Header rendered!");
    return <p>MyHeader</p>;
});

const AppBar = memo(() => {
    console.log("AppBar rendered!");
    return <p>MyAppBar</p>;
});

const SNSLinks = memo(() => {
    console.log("SNSLinks rendered!");
    return <p>MySNSLinks</p>;
});

const MyApp = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count + 1);

    return (
        <>
            <header>
                <Header />
                <AppBar />
            </header>
            <main>
                <h1>Title</h1>
                <p>高度な機能を備えた素晴らしいカウンタ</p>
                <p>{count}</p>
                <button onClick={incrementCount}>Click me!</button>
            </main>
            <footer>
                <p>Created by HogeHoge</p>
                <SNSLinks />
            </footer>
        </>
    );
};

export { MyApp as default };
