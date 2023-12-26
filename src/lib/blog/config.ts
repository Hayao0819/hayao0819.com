import path from "path";

export const POSTLIST_ONEPAGE = 9;
export const MDFILE_DIR = path.join(process.cwd(), "posts");
export const SUMMARY_LENGTH = 200;
export const CATEGORY_DESC = {
    プライベート: "プライベートなこと",
};

export const CATEGORY_INFO: { jp: string; url: string; desc: string }[] = [
    {
        jp: "プライベート",
        url: "private",
        desc: "プライベートなことについて",
    },
    {
        jp: "技術系",
        url: "tech",
        desc: "技術的な記録",
    },
    {
        jp: "ゲーム",
        url: "game",
        desc: "ゲームについて",
    },
];
