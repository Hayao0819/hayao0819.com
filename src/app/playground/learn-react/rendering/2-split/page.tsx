import { useState } from "react";

const Header = () => {
    console.log("Header rendered!");
    return <p>MyHeader</p>;
};

const AppBar = () => {
    console.log("AppBar rendered!");
    return <p>MyAppBar</p>;
};

const SNSLinks = () => {
    console.log("SNSLinks rendered!");
    return <p>MySNSLinks</p>;
};

const Counter = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count + 1);
    console.log("Counter rendered!");
    return (
        <>
            <p>{count}</p>
            <button onClick={incrementCount}>Click me!</button>
        </>
    );
};

const MyApp = () => {
    return (
        <>
            <header>
                <Header />
                <AppBar />
            </header>
            <main>
                <h1>Title</h1>
                <p>高度な機能を備えた素晴らしいカウンタ</p>
                <Counter />
            </main>
            <footer>
                <p>Created by HogeHoge</p>
                <SNSLinks />
            </footer>
        </>
    );
};

export { MyApp as default };
