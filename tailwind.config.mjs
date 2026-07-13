/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            minWidth: {
                "1/2": "50%",
                "1/3": "33.3%",
            },
            colors: {
                kaybase: "#ff6f21",
                line: "#06c755",
            },
            fontFamily: {
                gothic: [
                    "Hiragino Sans",
                    "ヒラギノ角ゴシック",
                    "メイリオ",
                    "Meiryo",
                    "MS Ｐゴシック",
                    "MS PGothic",
                    "sans-serif",
                    "YuGothic",
                    "Yu Gothic",
                ],
                display: [
                    "Noto Serif JP",
                    "Hiragino Mincho ProN",
                    "Yu Mincho",
                    "YuMincho",
                    "Baskerville",
                    "Times New Roman",
                    "serif",
                ],
                serifjp: [
                    "Noto Serif JP",
                    "Hiragino Mincho ProN",
                    "Yu Mincho",
                    "YuMincho",
                    "serif",
                ],
            },
            backgroundImage: {
                hero: "url('/me/gity.jpg')",
                "hero-sp": "url('/me/gity-sp.jpg')",
            },
        },
    },
    plugins: [],
};
