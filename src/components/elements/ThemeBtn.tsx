import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton() {
    const btn = {
        ToDark: <FontAwesomeIcon icon={faMoon} />,
        ToLight: <FontAwesomeIcon icon={faSun} />,
    };

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <button aria-label="DarkModeToggle" type="button" className="" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && <>{theme === "dark" ? btn.ToLight : btn.ToDark}</>}
        </button>
    );
}

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <div className="daisy-form-control">
            <label className="daisy-label cursor-pointer" onChange={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {/*<span className="daisy-label-text">Remember me</span>*/}

                {mounted && <>{theme === "dark" ? <input type="checkbox" className="daisy-toggle" checked /> : <input type="checkbox" className="daisy-toggle" />}</>}
            </label>
        </div>
    );
}
