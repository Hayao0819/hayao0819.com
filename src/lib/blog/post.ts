import fs from "fs";
import matter from "gray-matter";

import * as blogtools from "@/lib/blog";
import { Post, PostMeta } from "@/lib/blog/type";

import { MDFILE_DIR } from "./config";

export const getPostFromPath = (file: string): Post => {
    const fileContent = fs.readFileSync(file, "utf-8");
    const parsed = matter(fileContent);
    const meta: PostMeta = {};

    Object.keys(parsed.data).forEach((key) => {
        if (key === "date") {
            meta[key] = new Date(parsed.data[key]).toISOString();
        } else {
            meta[key] = parsed.data[key];
        }
    });

    //console.log(meta);

    return {
        file: file,
        url: "posts/" + blogtools.mdPathToURL(file),
        meta: meta,
        content: parsed.content,
    };
};

export const getAllPosts = (): Post[] => {
    const files = blogtools.getMdFilesInDir(MDFILE_DIR);

    return files
        .map((file) => {
            return getPostFromPath(file);
        })
        .filter((p) => {
            return p.meta.title && p.meta.date;
        })
        .sort((a, b) => {
            if (!a.meta.date || !b.meta.date) {
                return 0;
            }
            return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
        });
};
