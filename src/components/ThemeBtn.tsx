import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// レンダー後かを判定
export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <button aria-label="DarkModeToggle" type="button" className="" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && <>{theme === "dark" ? "ライト" : "ダーク"}</>}
        </button>
    );
}

export function ThemeSwitch(){
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
