import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";



export default function ThemeButton() {
    const btn = {
        ToDark: <FontAwesomeIcon icon={faMoon} />,
        ToLight:<FontAwesomeIcon icon={faSun} />
    }

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);


    return (
        <button aria-label="DarkModeToggle" type="button" className="" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && <>{theme === "dark" ? btn.ToLight  : btn.ToDark}</>}
        </button>
    );
}
