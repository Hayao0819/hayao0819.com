import { useState } from "react";

export default function Links() {
    const [hoge, changeHoge] = useState(0);

    const increment = () => {
        changeHoge(hoge + 1);
    };

    return (
        <>
            <div onClick={increment}>links</div>
            <div>{hoge}</div>
        </>
    );
}
