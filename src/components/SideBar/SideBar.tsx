//import Image from "next/image";
import { useState } from "react";

export default function StateTest() {
    const [state, changeState] = useState(false);

    const toggleState = () => {
        console.log("なんで動かないん");
        changeState(!state);
    };

    if (state) {
        return (
            <>
                <button onClick={toggleState}>state = true</button>
            </>
        );
    } else {
        return (
            <>
                <button onClick={toggleState}>state = false</button>
            </>
        );
    }
}

