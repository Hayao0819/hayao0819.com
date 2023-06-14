import { useState } from "react";

export default function StateText() {
    const [isOpened, changeState] = useState(false);

    const toggleMenu = () => {
        changeState(!isOpened);
    };

    return (
        <>
            <div onClick={toggleMenu}>
                state = {isOpened ? "true" : "false"}
            </div>
        </>
    );
}
