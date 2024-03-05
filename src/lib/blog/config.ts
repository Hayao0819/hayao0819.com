import path from "path";

import { URLFormat } from "../markdown/url";
import { Category } from "./categories";

export const POSTLIST_ONEPAGE = 9;
export const MDFILE_DIR = path.join(process.cwd(), "posts");
export const SUMMARY_LENGTH = 200;

export const BLOG_URL_FORMAT: URLFormat = {
    cutHead: path.join(process.cwd()).replaceAll(path.sep, "/").split("/").length + 1,
};

export const CATEGORY_INFO: Category[] = [
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
