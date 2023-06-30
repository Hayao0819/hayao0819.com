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
